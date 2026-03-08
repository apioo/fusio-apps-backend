import {Component, OnInit, signal} from '@angular/core';
import {ApiService} from "../../../api.service";
import {AgentService} from "../../../services/agent.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent, BackendAgentInput, BackendAgentMessage, CommonMessage} from "fusio-sdk";
import {Action} from "./action/action";
import {General} from "./general/general";
import {Schema} from "./schema/schema";
import {Architect} from "./architect/architect";
import {NgClass} from "@angular/common";
import {Input} from "./input/input";

@Component({
  selector: 'app-message',
  imports: [
    Action,
    RouterLink,
    General,
    Architect,
    Schema,
    MessageComponent,
    NgbAlert,
    NgClass,
    Input
  ],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit {

  agent = signal<BackendAgent|undefined>(undefined);
  chats = signal<Array<BackendAgentMessage>>([]);
  selected = signal<number|undefined>(undefined);
  messages = signal<Array<BackendAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(protected api: ApiService, private agentService: AgentService, private route: ActivatedRoute, private router: Router, protected error: ErrorService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params['id']) {
        const agent = await this.agentService.get(params['id']);
        if (agent) {
          this.agent.set(agent);
          this.loadChats();
        }
      }
      if (params['chat_id']) {
        this.selected.set(parseInt(params['chat_id']));
        this.loadMessages();
      } else {
        this.selected.set(undefined);
      }
    });
  }

  async loadChats() {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    try {
      const collection = await this.api.getClient().backend().agent().message().getAll('' + agentId);

      this.loading.set(false);
      this.chats.set(collection.entry || []);
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  getSelected(): BackendAgentMessage|undefined {
    let result = undefined;
    this.chats().forEach((chat) => {
      if (chat.id === this.selected()) {
        result = chat;
      }
    });
    return result;
  }

  loadChat(chat: BackendAgentMessage) {
    const agent = this.agent();
    if (!agent) {
      return;
    }

    this.router.navigate(['/agent', agent.id, 'message', chat.id]);
  }

  async loadMessages() {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    const selected = this.selected();
    if (!selected) {
      return;
    }

    try {
      const collection = await this.api.getClient().backend().agent().message().getAll('' + agentId, selected);

      this.loading.set(false);
      this.messages.set(collection.entry || []);
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  async doSend(message: string) {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    const payload: BackendAgentInput = {
      input: {
        type: "text",
        content: message
      }
    };

    try {
      const output = await this.api.getClient().backend().agent().message().submit('' + agentId, payload);

      this.loading.set(false);
    } catch (error) {
      this.loading.set(false);
    }
  }

}
