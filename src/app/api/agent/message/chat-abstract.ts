import {Component, input, OnInit, signal} from '@angular/core';
import {
  BackendAgent,
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall,
  BackendAgentMessage,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-agent-chat-abstract',
  template: ''
})
export abstract class ChatAbstract implements OnInit {

  agent = input.required<BackendAgent>();
  origin = input.required<BackendAgentMessage>();

  messages = signal<Array<BackendAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  protected constructor(protected api: ApiService, protected error: ErrorService) {
  }

  ngOnInit(): void {
    this.messages.update((messages) => {
      messages.push(this.origin());
      return messages;
    });

    this.loadMessages();
  }

  async loadMessages() {
    const agentId = this.agent().id;
    if (!agentId) {
      return;
    }

    const originId = this.origin().id;
    if (!originId) {
      return;
    }

    try {
      const collection = await this.api.getClient().backend().agent().message().getAll('' + agentId, originId);
      const messages = collection.entry || [];

      messages.forEach((message) => {
        this.messages.update((messages) => {
          messages.push(message);
          return messages;
        });
      });

      this.loading.set(false);

      this.scrollToBottom();
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  async doSend(message: string) {
    if (!message) {
      return;
    }

    const agentId = this.agent().id;
    if (!agentId) {
      return;
    }

    this.messages.update((messages) => {
      messages.push({
        role: 'user',
        content: {
          type: 'text',
          content: message,
        },
      });
      return messages;
    });

    this.loading.set(true);

    this.preOutput();

    try {
      const response = await this.api.getClient().backend().agent().message().submit('' + agentId, {
        input: {
          type: 'text',
          content: message,
        }
      });

      const output = response.output;
      if (output) {
        this.messages.update((messages) => {
          messages.push({
            role: 'assistant',
            content: output,
          });
          return messages;
        });

        this.onOutput(output);

        this.scrollToBottom();
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.postOutput();

    this.loading.set(false);
  }

  abstract onOutput(output: BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall): void;

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
