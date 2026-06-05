import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Agent, ChatAbstract, Input, MessageComponent, Row} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {AgentSchemaService, Schema as SchemaModel} from "../../../../services/agent/agent-schema.service";

@Component({
  selector: 'app-agent-message-schema',
  imports: [
    FormsModule,
    JsonPipe,
    MessageComponent,
    TypeschemaEditorModule,
    Row,
    Input,
  ],
  templateUrl: './schema.html',
  styleUrl: './schema.css',
})
export class Schema extends ChatAbstract<SchemaModel> {

  schemaAgent = inject(AgentSchemaService);

  getAgent(): Agent<SchemaModel> {
    return this.schemaAgent;
  }

}
