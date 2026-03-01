import {Component, input} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {
  BackendAgent,
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall, BackendAgentMessage
} from "fusio-sdk";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ApiService} from "../../../../api.service";

@Component({
  selector: 'app-agent-message-general',
  imports: [
    FormsModule,
    MessageComponent,
    ReactiveFormsModule,
    TypeschemaEditorModule,
    Input,
    Row
  ],
  templateUrl: './general.html',
  styleUrl: './general.css',
})
export class General extends ChatAbstract {

  constructor(api: ApiService, error: ErrorService) {
    super(api, error);
  }

  onOutput(output: BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall): void {
  }

}
