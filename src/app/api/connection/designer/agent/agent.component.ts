import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {ConnectionService} from "../../../../services/connection.service";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {FormsModule} from "@angular/forms";
import {Input} from "../../../agent/message/input/input";
import {Row} from "../../../agent/message/row/row";
import {AgentItemText, AgentOutput, BackendAgentMessage, BackendConnection, CommonMessage} from "fusio-sdk";

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

  input = signal<BackendAgentMessage|undefined>(undefined);
  output = signal<BackendAgentMessage|undefined>(undefined);
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

    const item: AgentItemText = {
      type: 'text',
      content: input,
    };

    this.loading.set(true);

    this.input.set({
      role: 'user',
      item: item
    });
    this.output.set(undefined);

    try {
      const response = await this.api.getClient().backend().connection().agent().send('' + connectionId, {
        item: item
      });

      this.output.set({
        role: 'assistant',
        item: response.item
      });
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

}
