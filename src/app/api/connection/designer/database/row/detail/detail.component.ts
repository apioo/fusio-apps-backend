import {Component, computed, signal} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseRow, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RowService} from "../../../../../../services/connection/database/row.service";
import {TableService} from "../../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../../services/connection.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-connection-database-row-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendDatabaseRow> {

  id = signal<string|null>(null);
  selectedConnection = signal<BackendConnection|undefined>(undefined);
  selectedTable = signal<BackendDatabaseTable|undefined>(undefined);

  primaryKey = computed<string>(() => {
    return this.selectedTable()?.primaryKey || '';
  });

  keyValues = computed<Array<KeyValue>>(() => {
    const selected = this.selected();
    if (!selected) {
      return [];
    }

    const result = [];
    for (const [key, value] of Object.entries(selected)) {
      result.push({
        key: key,
        value: value,
      })
    }

    return result;
  });

  constructor(private service: RowService, private connection: ConnectionService, private tableService: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RowService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        const connection = await this.connection.get(params['connection']);
        if (connection) {
          this.service.setConnection(connection);
          this.tableService.setConnection(connection);
          this.selectedConnection.set(connection);
        }
      }

      if (params['table']) {
        const table = await this.tableService.get(params['table']);
        if (table) {
          this.service.setTable(table);
          this.selectedTable.set(table);
        }
      }
    });

    this.route.paramMap.subscribe(async params => {
      this.id.set(params.get('id'));
    });
  }

}

interface KeyValue {
  key: string
  value: string
}
