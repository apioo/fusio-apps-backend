import {Component, inject, signal} from '@angular/core';
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {Response} from "../../../action/designer/response/response";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {BackendActionExecuteResponse, BackendActionExecuteResponseBody, CommonMessage} from "fusio-sdk";
import {ChatAbstract} from "../chat-abstract";
import {MessageComponent} from "ngx-fusio-sdk";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {Action as ActionModel, AgentActionService} from "../../../../services/agent/agent-action.service";
import {Agent} from "../../../../services/agent/agent";

@Component({
  selector: 'app-agent-message-action',
  imports: [
    EditorComponent,
    FormsModule,
    Response,
    TypeschemaEditorModule,
    MessageComponent,
    Input,
    Row
  ],
  templateUrl: './action.html',
  styleUrl: './action.css',
})
export class Action extends ChatAbstract<ActionModel> {

  actionResponse = signal<BackendActionExecuteResponse|undefined>(undefined);

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
