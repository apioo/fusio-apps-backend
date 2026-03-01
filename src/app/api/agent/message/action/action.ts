import {Component, input, signal} from '@angular/core';
import {EditorComponent} from "ngx-monaco-editor-v2-alternative";
import {FormsModule} from "@angular/forms";
import {Response} from "../../../action/designer/response/response";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {
  BackendAction,
  BackendActionExecuteResponse,
  BackendActionExecuteResponseBody,
  BackendAgent,
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall,
  BackendAgentMessage,
  CommonMessage
} from "fusio-sdk";
import {ChatAbstract} from "../chat-abstract";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ApiService} from "../../../../api.service";

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
export class Action extends ChatAbstract {

  action = signal<BackendAction|undefined>(undefined);
  actionResponse = signal<BackendActionExecuteResponse|undefined>(undefined);
  actionLoading = signal<boolean>(false);
  code = signal<string>('');

  constructor(api: ApiService, error: ErrorService) {
    super(api, error);
  }

  onOutput(output: BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall): void {
    if (output.type === 'text' && output.content) {
      this.loadAction(output.content);
    }
  }

  loadAction(content: string) {
    const name = this.extractName(content);
    const code = this.extractCode(content);

    const action: BackendAction = {
      name: name,
      class: 'Fusio.Adapter.Worker.Action.WorkerPHPLocal',
      config: {
        code: code
      },
    };

    this.action.set(action);
    this.code.set(code);
  }

  async executeAction() {
    const action = this.action();
    if (!action) {
      return;
    }

    const code = this.code();
    if (!code) {
      return;
    }

    const name = action.name;
    if (!name) {
      return;
    }

    this.actionLoading.set(true);

    try {
      let existing: BackendAction|undefined = undefined;
      try {
        existing = await this.api.getClient().backend().action().get('~' + name);
      } catch (error) {
        // action does not exist
      }

      let response: CommonMessage;
      if (existing) {
        if (!existing.config) {
          existing.config = {};
        }

        existing.config['code'] = code;

        response = await this.api.getClient().backend().action().update('' + existing.id, existing);
      } else {
        response = await this.api.getClient().backend().action().create(action);
      }

      this.actionResponse.set(await this.api.getClient().backend().action().execute('' + response.id, {}));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.actionLoading.set(false);
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

  private extractName(content: string): string {
    const result = content.match(/Action: ([A-Za-z0-9-]+)/im);
    if (!result) {
      return '';
    }

    return result[1] || '';
  }

  private extractCode(content: string): string {
    let captured = false;
    let code = '';

    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '<?php') {
        captured = true;
      }

      if (captured) {
        code+= line + "\n";
      }

      if (line === '};') {
        break;
      }
    }

    return code;
  }

}
