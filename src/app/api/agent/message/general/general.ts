import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Agent, AgentContent, ChatAbstract, Input, MessageComponent, Row} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {AgentGeneralService} from "../../../../services/agent/agent-general.service";

@Component({
  selector: 'app-agent-message-general',
  imports: [
    FormsModule,
    MessageComponent,
    ReactiveFormsModule,
    TypeschemaEditorModule,
    Row,
    Input,
  ],
  templateUrl: './general.html',
  styleUrl: './general.css',
})
export class General extends ChatAbstract<AgentContent> {

  generalAgent = inject(AgentGeneralService);

  getAgent(): Agent<AgentContent> {
    return this.generalAgent;
  }

}
