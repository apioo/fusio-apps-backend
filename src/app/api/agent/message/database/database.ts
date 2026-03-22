import {Component, inject, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {FormAutocompleteComponent, MessageComponent} from "ngx-fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {ChatAbstract} from "../chat-abstract";
import {Input} from "../input/input";
import {Row} from "../row/row";
import {DatabaseTable} from "../../../../shared/database-table/database-table";
import {ConnectionService} from "../../../../services/connection.service";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {Agent} from "../../../../services/agent/agent";
import {
  AgentDatabaseService,
  Database as DatabaseModel,
  Options
} from "../../../../services/agent/agent-database.service";

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
export class Database extends ChatAbstract<DatabaseModel, Options> {

  connectionId = signal<number|undefined>(undefined);

  databaseAgent = inject(AgentDatabaseService);
  connection = inject(ConnectionService);

  getAgent(): Agent<DatabaseModel, Options> {
    return this.databaseAgent;
  }

  protected override getOptions(): Options|undefined {
    const connectionId = this.connectionId();
    if (!connectionId) {
      throw new Error('Please select a connection');
    }

    return {
      connectionId: connectionId
    };
  }

}
