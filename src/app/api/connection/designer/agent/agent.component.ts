import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {ConnectionService} from "../../../../services/connection.service";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {FormsModule} from "@angular/forms";
import {Input} from "../../../agent/message/input/input";
import {Row} from "../../../agent/message/row/row";
import {AgentItemText, BackendAgentMessage, BackendConnection, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-connection-agent',
  templateUrl: './agent.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    TypeschemaEditorModule,
    FormsModule,
    Input,
    Row
  ],
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  messages = signal<Array<BackendAgentMessage>>([]);
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        const connection = await this.connection.get(params['connection']);
        if (connection) {
          try {
            this.selectedConnection.set(connection);
          } catch (error) {
            this.response.set(this.error.convert(error));
          }
        }
      }
    });
  }

  async doSend(input: string) {
    const connectionId = this.selectedConnection()?.id;
    if (!connectionId) {
      return;
    }

    const content: AgentItemText = {
      type: 'text',
      content: input,
    };

    this.messages.update((messages) => {
      messages.push({
        role: "user",
        item: content,
      });
      return messages;
    });

    this.loading.set(true);

    try {
      const response = await this.api.getClient().backend().connection().agent().send('' + connectionId, {
        item: content
      });

      if (response.item) {
        this.messages.update((messages) => {
          messages.push({
            role: "assistant",
            item: response.item,
          });
          return messages;
        });

        this.scrollToBottom();
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
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
