import {Component, input, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {
  BackendAgent,
  BackendAgentContentBinary,
  BackendAgentContentChoice,
  BackendAgentContentObject,
  BackendAgentContentText,
  BackendAgentContentToolCall, BackendAgentMessage,
  BackendSchema,
  CommonMessage
} from "fusio-sdk";
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

  schema = signal<BackendSchema|undefined>(undefined);
  schemaLoading = signal<boolean>(false);
  spec = signal<any>(undefined);

  constructor(api: ApiService, error: ErrorService) {
    super(api, error);
  }

  onOutput(output: BackendAgentContentBinary | BackendAgentContentChoice | BackendAgentContentObject | BackendAgentContentText | BackendAgentContentToolCall): void {
    if (output.type === 'object' && output.payload) {
      this.loadSchema(output.payload);
    }
  }

  isSchemaPayload(message: BackendAgentMessage): boolean {
    return message.role === 'assistant' && message.content?.type === 'object';
  }

  async loadSchema(schema: any) {
    this.schema.set(schema);

    if (schema.source) {
      //this.spec.set(spec);
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
        // action does not exist
      }

      let response: CommonMessage;
      if (existing) {
        response = await this.api.getClient().backend().schema().update('' + existing.id, existing);
      } else {
        response = await this.api.getClient().backend().schema().create(schema);
      }

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.schemaLoading.set(false);
  }

}
