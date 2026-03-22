import {Component, inject} from '@angular/core';
import {ChatAbstract} from "../chat-abstract";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {Input} from "../input/input";
import {Row} from "../row/row";
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
