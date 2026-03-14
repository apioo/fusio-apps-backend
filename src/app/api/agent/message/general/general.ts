import {Component, inject, input} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {
  BackendAgent,
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall, BackendAgentMessage, BackendAgentOutput
} from "fusio-sdk";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ApiService} from "../../../../api.service";
import {Action as ActionModel, AgentActionService} from "../../../../services/agent/agent-action.service";
import {Agent, BackendAgentContent} from "../../../../services/agent/agent";
import {AgentGeneralService} from "../../../../services/agent/agent-general.service";

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
export class General extends ChatAbstract<BackendAgentContent> {

  generalAgent = inject(AgentGeneralService);

  getAgent(): Agent<BackendAgentContent> {
    return this.generalAgent;
  }

}
