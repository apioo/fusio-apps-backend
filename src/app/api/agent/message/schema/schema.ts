import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ExportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {BackendAgentMessage, BackendSchema, BackendSchemaSource, CommonMessage} from "fusio-sdk";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ApiService} from "../../../../api.service";

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
export class Schema extends ChatAbstract {

  schema = signal<Document|undefined>(undefined);
  schemaLoading = signal<boolean>(false);

  exportService = inject(ExportService);

  constructor(api: ApiService, error: ErrorService) {
    super(api, error);
  }

  async onLoad(message: BackendAgentMessage): Promise<void> {
    if (message.content && message.content.type === 'object' && message.content.payload) {
      await this.loadSchema(message.content.payload);
    }
  }

  async loadSchema(schema: Document) {
    if (schema.name && schema.types) {
      this.schema.set(schema);
    }
  }

  async saveSchema() {
    const schema = this.schema();
    if (!schema) {
      return;
    }

    const name = schema.name;
    if (!name) {
      return;
    }

    this.schemaLoading.set(true);

    try {
      let existing: BackendSchema|undefined = undefined;
      try {
        existing = await this.api.getClient().backend().schema().get('~' + name);
      } catch (error) {
        // schema does not exist
      }

      const source = this.exportService.transform(schema);

      let response: CommonMessage;
      if (existing) {
        existing.source = source;

        response = await this.api.getClient().backend().schema().update('' + existing.id, existing);
      } else {
        response = await this.api.getClient().backend().schema().create({
          name: name,
          source: source
        });
      }

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.schemaLoading.set(false);
  }

}

interface Document extends Specification {
  name: string
}
