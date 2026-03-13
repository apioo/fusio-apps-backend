import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ErrorService, FormAutocompleteComponent, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {BackendAgentMessage, BackendDatabaseTable, CommonMessage} from "fusio-sdk";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {ApiService} from "../../../../api.service";
import {DatabaseTable} from "../../../../shared/database-table/database-table";
import {ConnectionService} from "../../../../services/connection.service";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-agent-message-database',
  imports: [
    FormsModule,
    JsonPipe,
    MessageComponent,
    TypeschemaEditorModule,
    Input,
    Row,
    DatabaseTable,
    FormAutocompleteComponent,
    NgbPopover
  ],
  templateUrl: './database.html',
  styleUrl: './database.css',
})
export class Database extends ChatAbstract {

  connectionId = signal<number|undefined>(undefined);
  schema = signal<Schema|undefined>(undefined);
  schemaLoading = signal<boolean>(false);

  connection = inject(ConnectionService);

  constructor(api: ApiService, error: ErrorService) {
    super(api, error);
  }

  async onLoad(message: BackendAgentMessage): Promise<void> {
    if (message.content && message.content.type === 'object' && message.content.payload) {
      await this.loadTables(message.content.payload);
    }
  }

  async loadTables(schema: Schema) {
    if (schema.tables && schema.tables.length > 0) {
      this.schema.set(schema);
    }
  }

  async createTables() {
    const connectionId = this.connectionId();
    if (!connectionId) {
      return;
    }

    const schema = this.schema();
    if (!schema || !schema.tables) {
      return;
    }

    this.schemaLoading.set(true);

    try {
      let responses: Array<CommonMessage> = [];

      for (let i = 0; i < schema.tables.length; i++) {
        const table = schema.tables[i];
        const response = await this.api.getClient().backend().connection().database().createTable('' + connectionId, table);
        if (response.success === true) {
          responses.push(response);
        }
      }

      this.response.set({
        success: true,
        message: 'Successfully created ' + responses.length + ' tables',
      });
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.schemaLoading.set(false);
  }

}

interface Schema {
  tables: Array<BackendDatabaseTable>
}
