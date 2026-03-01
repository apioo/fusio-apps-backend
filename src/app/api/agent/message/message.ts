import {Component, OnInit, signal} from '@angular/core';
import {ApiService} from "../../../api.service";
import {AgentService} from "../../../services/agent.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent, BackendAgentMessage, CommonMessage} from "fusio-sdk";
import {Action} from "./action/action";
import {General} from "./general/general";
import {Schema} from "./schema/schema";
import {Architect} from "./architect/architect";

@Component({
  selector: 'app-message',
  imports: [
    Action,
    RouterLink,
    General,
    Architect,
    Schema,
    MessageComponent,
    NgbAlert
  ],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message implements OnInit {

  agent: BackendAgent|undefined = undefined;

  chats = signal<Array<BackendAgentMessage>>([]);
  selected = signal<BackendAgentMessage|undefined>(undefined);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(protected api: ApiService, private agentService: AgentService, private route: ActivatedRoute, protected error: ErrorService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      if (params['agent_id']) {
        const agent = await this.agentService.get(params['agent_id']);
        if (agent) {
          this.agent = agent;
          this.loadChats();
        }
      }
    });
  }

  async loadChats() {
    const agentId = this.agent?.id;
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

  loadChat(chat: BackendAgentMessage) {
    this.selected.set(chat);
  }

}
