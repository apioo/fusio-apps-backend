import {Component, computed, input, resource, signal} from '@angular/core';
import {BackendAgent, BackendAgentInput, BackendAgentMessage, BackendAgentOutput, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-agent-chat-abstract',
  template: ''
})
export abstract class ChatAbstract {

  agent = input.required<BackendAgent>();
  parent = input.required<BackendAgentMessage>();

  output = signal<BackendAgentOutput|undefined>(undefined);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  messagesResource = resource<Array<BackendAgentMessage>, { agent: BackendAgent, parent: BackendAgentMessage, output: BackendAgentOutput|undefined }>({
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

        if (lastMessage) {
          this.onLoad(lastMessage);
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

  protected constructor(protected api: ApiService, protected error: ErrorService) {
  }

  async doSend(message: string) {
    if (!message) {
      return;
    }

    const agentId = this.agent().id;
    if (!agentId) {
      return;
    }

    this.loading.set(true);

    this.preOutput();

    const parentId = this.parent().id;

    try {
      const input: BackendAgentInput = {
        input: {
          type: 'text',
          content: message,
        }
      };

      const output = await this.api.getClient().backend().agent().message().submit('' + agentId, input, parentId);

      this.output.set(output);

      this.scrollToBottom();
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.postOutput();

    this.loading.set(false);
  }

  abstract onLoad(message: BackendAgentMessage): void;

  protected preOutput(): void {
  }

  protected postOutput(): void {
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
