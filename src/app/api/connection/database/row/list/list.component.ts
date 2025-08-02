import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseRow, BackendDatabaseTable, BackendDatabaseTableColumn} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {RowService} from "../../../../../services/connection/database/row.service";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";

@Component({
  selector: 'app-connection-database-row-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendDatabaseRow> {

  selectedConnection?: BackendConnection;
  table?: BackendDatabaseTable;

  constructor(private service: RowService, private connection: ConnectionService, private tableService: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RowService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = await this.connection.get(params['connection']);
        if (this.selectedConnection) {
          this.service.setConnection(this.selectedConnection);
          this.tableService.setConnection(this.selectedConnection);
        }
      }

      if (params['table']) {
        this.table = await this.tableService.get(params['table']);
        this.service.setTable(this.table);
      }

      if (this.service.isConfigured()) {
        await super.ngOnInit();
      }
    });

    this.route.queryParams.subscribe(async params => {
      let page, search;
      if (params['page']) {
        page = parseInt(params['page']);
      }
      if (params['search']) {
        search = params['search'];
      }

      if (!this.hasQueryParamsChange(page, search)) {
        return;
      }

      this.page = page || 1;
      this.search = search || '';
    });
  }

  get columns(): Array<BackendDatabaseTableColumn> {
    if (!this.table?.columns) {
      return [];
    }

    let columns = [];
    for (const col of this.table.columns) {
      if (col.type === 'string' || col.type === 'integer' || col.type === 'boolean' || col.type === 'float') {
        columns.push(col);
      }
    }

    return columns;
  }

  get primaryKey(): string {
    return this.table?.primaryKey || '';
  }

}
