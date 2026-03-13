import {Component, computed, OnInit, signal} from '@angular/core';
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
import {Type} from "./type/type";

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
    Input,
    Type
  ],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit {

  agent = signal<BackendAgent|undefined>(undefined);
  chats = signal<Array<BackendAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  selectedId = signal<number|undefined>(undefined);
  selected = computed<BackendAgentMessage|undefined>((): BackendAgentMessage|undefined => {
    let result = undefined;
    this.chats().forEach((chat) => {
      if (chat.id === this.selectedId()) {
        result = chat;
      }
    });
    return result;
  });

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
        this.selectedId.set(parseInt(params['chat_id']));
      } else {
        this.selectedId.set(undefined);
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

  async loadChat(chat: BackendAgentMessage) {
    const agent = this.agent();
    if (!agent) {
      return;
    }

    await this.router.navigate(['/agent', agent.id, 'message', chat.id]);
  }

  async doSend(message: string) {
    const agentId = this.agent()?.id;
    if (!agentId) {
      return;
    }

    const selected = this.selectedId();

    const payload: BackendAgentInput = {
      input: {
        type: "text",
        content: message
      }
    };

    this.loading.set(true);

    try {
      const output = await this.api.getClient().backend().agent().message().submit('' + agentId, payload, selected);

      this.loading.set(false);

      await this.router.navigate(['/agent', agentId, 'message', output.id]);
    } catch (error) {
      this.response.set(this.error.convert(error));
      this.loading.set(false);
    }
  }

}
