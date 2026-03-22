import {Component, computed, inject, input, resource, signal} from '@angular/core';
import {AgentItem, BackendAgent, BackendAgentMessage, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {Agent, BackendAgentContent, ExecutionIndicator, Message} from "../../../services/agent/agent";

@Component({
  selector: 'app-agent-chat-abstract',
  template: ''
})
export abstract class ChatAbstract<TModel, TOptions = undefined> {

  agent = input.required<BackendAgent>();
  chatId = input.required<string>();

  model = signal<TModel|undefined>(undefined);

  output = signal<AgentItem|undefined>(undefined);
  loading = signal<boolean>(false);
  executeLoading = signal<boolean>(false);
  executeMessages = signal<Array<Message>>([]);
  response = signal<CommonMessage|undefined>(undefined);

  messagesResource = resource<Array<BackendAgentMessage>, { agent: BackendAgent, chatId: string, output: AgentItem|undefined }>({
    params: () => ({
      agent: this.agent(),
      chatId: this.chatId(),
      output: this.output(),
    }),
    loader: async (params) => {
      const collection = await this.api.getClient().backend().agent().message().getAll('' + params.params.agent.id, params.params.chatId);
      const entries = collection.entry || [];

      let lastMessage: BackendAgentMessage|undefined;
      const messages: Array<BackendAgentMessage> = [];
      entries.forEach((message) => {
        messages.push(message);

        if (message.role === 'assistant') {
          lastMessage = message;
        }
      });

      if (lastMessage && lastMessage.item) {
        this.load(lastMessage.item);
      }

      return messages;
    }
  });

  messages = computed<Array<BackendAgentMessage>|undefined>(() => {
    if (this.messagesResource.hasValue()) {
      return this.messagesResource.value();
    }

    return undefined;
  });

  protected api = inject(ApiService);
  protected error = inject(ErrorService);

  abstract getAgent(): Agent<TModel, TOptions>;

  async doSend(message: string) {
    if (!message) {
      return;
    }

    const agentId = this.agent().id;
    if (!agentId) {
      return;
    }

    this.loading.set(true);

    try {
      const content = await this.getAgent().prompt(agentId, message, this.chatId());

      this.output.set(content);

      this.onSend();

      this.scrollToBottom();
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

  load(content?: BackendAgentContent): void {
    if (!content) {
      return;
    }

    this.executeMessages.set([]);
    this.model.set(this.getAgent().transform(content));

    this.onLoad();
  }

  async execute(): Promise<void> {
    const model = this.model();
    if (!model) {
      return;
    }

    this.executeLoading.set(true);

    try {
      const executeMessages = this.executeMessages;
      const indicator = new ExecutionIndicator((message: Message) => {
        executeMessages.update((messages) => {
          return messages.concat([message]);
        });
      });

      const options = this.getOptions();

      const response = await this.getAgent().execute(model, indicator, options);
      this.response.set(response);

      if (response) {
        this.onExecute(response);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.executeLoading.set(false);
  }

  protected onLoad(): void {
  }

  protected onSend(): void {
  }

  protected onExecute(message: CommonMessage): void {
  }

  protected getOptions(): TOptions|undefined {
    return;
  }

  scrollToBottom(): void {
    window.setTimeout(() => {
      let messagesBottom = document.getElementById('messages-bottom');
      if (messagesBottom !== null) {
        messagesBottom.scrollIntoView();
      }
    }, 500);
  }

}
