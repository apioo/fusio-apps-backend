import {Component, inject} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {Agent, Chat, FusioService, Input, MessageComponent, Row} from "ngx-fusio-sdk";
import {ImportService, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {AgentSchemaService, Schema as SchemaModel} from "../../../../services/agent/agent-schema.service";

@Component({
  selector: 'app-agent-chat-schema',
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
export class Schema extends Chat<SchemaModel> {

  api = inject(FusioService);
  schemaAgent = inject(AgentSchemaService);
  importService = inject(ImportService);

  getAgent(): Agent<SchemaModel> {
    return this.schemaAgent;
  }

  protected override async onEmpty() {
    const refId = this.refId();
    if (refId > 0) {
      const schema = await this.api.getClient().backend().schema().get('' + refId);
      const specification = await this.importService.transform('typeschema', JSON.stringify(schema.source));

      this.model.set({
        name: schema.name || '',
        ...specification,
      });
    }
  }

}
