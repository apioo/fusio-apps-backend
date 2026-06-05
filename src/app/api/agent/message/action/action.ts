import {Component, inject, signal} from '@angular/core';
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {Response} from "../../../action/designer/response/response";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {BackendActionExecuteResponse, BackendActionExecuteResponseBody, CommonMessage} from "fusio-sdk";
import {Agent, ChatAbstract, FusioService, Input, MessageComponent, Row} from "ngx-fusio-sdk";
import {Action as ActionModel, AgentActionService} from "../../../../services/agent/agent-action.service";

@Component({
  selector: 'app-agent-message-action',
  imports: [
    EditorComponent,
    FormsModule,
    Response,
    TypeschemaEditorModule,
    MessageComponent,
    Row,
    Input,
  ],
  templateUrl: './action.html',
  styleUrl: './action.css',
})
export class Action extends ChatAbstract<ActionModel> {

  actionResponse = signal<BackendActionExecuteResponse|undefined>(undefined);

  api = inject(FusioService);
  actionAgent = inject(AgentActionService);

  getAgent(): Agent<ActionModel> {
    return this.actionAgent;
  }

  override async onExecute(message: CommonMessage) {
    this.actionResponse.set(await this.api.getClient().backend().action().execute('' + message.id, {}));
  }

  getErrorMessage(response: BackendActionExecuteResponseBody): string|null {
    if (response['success'] === false && response['title'] && response['message']) {
      let message = 'Try to fix the following error:' + "\n";
      message+= 'Error: ' + response['title'] + "\n";
      message+= 'Message: ' + response['message'] + "\n";
      return message;
    }

    return null;
  }

}
