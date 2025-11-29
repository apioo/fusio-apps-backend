import {Component, computed, signal} from '@angular/core';
import {ErrorService, List, SearchComponent} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseRow, BackendDatabaseTable, BackendDatabaseTableColumn} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RowService} from "../../../../../services/connection/database/row.service";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-connection-database-row-list',
  templateUrl: './list.component.html',
  imports: [
    RouterLink,
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendDatabaseRow> {

  selectedConnection = signal<BackendConnection|undefined>(undefined);
  selectedTable = signal<BackendDatabaseTable|undefined>(undefined);

  primaryKey = computed<string>(() => {
    return this.selectedTable()?.primaryKey || '';
  });

  columns = computed<Array<BackendDatabaseTableColumn>>(() => {
    const tableColumns = this.selectedTable()?.columns;
    if (!tableColumns) {
      return [];
    }

    let columns = [];
    for (const col of tableColumns) {
      if (col.type === 'string' || col.type === 'integer' || col.type === 'boolean' || col.type === 'float') {
        columns.push(col);
      }
    }

    return columns;
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
  }

}
