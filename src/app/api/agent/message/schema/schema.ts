import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {AgentSchemaService, Schema as SchemaModel} from "../../../../services/agent/agent-schema.service";
import {Agent} from "../../../../services/agent/agent";

@Component({
  selector: 'app-agent-message-schema',
  imports: [
    FormsModule,
    JsonPipe,
    MessageComponent,
    TypeschemaEditorModule,
    Input,
    Row
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
