import {Component, computed, inject, input, resource, signal} from '@angular/core';
import {BackendAgent, BackendAgentMessage, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";
import {Agent, BackendAgentContent} from "../../../services/agent/agent";

@Component({
  selector: 'app-agent-chat-abstract',
  template: ''
})
export abstract class ChatAbstract<TModel, TOptions = undefined> {

  agent = input.required<BackendAgent>();
  parent = input.required<BackendAgentMessage>();

  model = signal<TModel|undefined>(undefined);

  output = signal<BackendAgentContent|undefined>(undefined);
  loading = signal<boolean>(false);
  executeLoading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  messagesResource = resource<Array<BackendAgentMessage>, { agent: BackendAgent, parent: BackendAgentMessage, output: BackendAgentContent|undefined }>({
    params: () => ({
      agent: this.agent(),
      parent: this.parent(),
      output: this.output(),
    }),
    loader: async (params) => {
      const messages: Array<BackendAgentMessage> = [];
      messages.push(params.params.parent);

      const agentId = params.params.agent.id;
      const parentId = params.params.parent.id;
      if (agentId && parentId) {
        const collection = await this.api.getClient().backend().agent().message().getAll('' + agentId, parentId);
        const entries = collection.entry || [];

        let lastMessage: BackendAgentMessage|undefined;
        entries.forEach((message) => {
          messages.push(message);

          if (message.role === 'assistant') {
            lastMessage = message;
          }
        });

        if (lastMessage && lastMessage.content) {
          this.load(lastMessage.content);
        }
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

    const parentId = this.parent().id;

    try {
      const content = await this.getAgent().prompt(agentId, message, parentId);

      this.output.set(content);

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

    this.model.set(this.getAgent().transform(content));
  }

  async execute(): Promise<void> {
    const model = this.model();
    if (!model) {
      return;
    }

    this.executeLoading.set(true);

    try {
      const options = this.getOptions();

      const response = await this.getAgent().execute(model, options);
      this.response.set(response);

      if (response) {
        this.onExecute(response);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.executeLoading.set(false);
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
