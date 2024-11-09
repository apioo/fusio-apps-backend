import {Component, OnInit} from '@angular/core';
import {ErrorService, Mode, Result} from "ngx-fusio-sdk";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {
  BackendDatabaseRow,
  BackendDatabaseRows,
  BackendDatabaseTable,
  BackendDatabaseTableColumn,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {RowComponent} from "../row/row.component";
import {TableComponent} from "../table/table.component";

@Component({
  selector: 'app-database-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  connections: Array<string> = [];
  selectedConnection?: string = undefined;

  tables: Array<string> = [];
  selectedTable?: string = undefined;

  table?: BackendDatabaseTable;
  columns: Array<BackendDatabaseTableColumn> = [];
  rows?: BackendDatabaseRows;
  activeTab: number = 1;

  totalResults: number = 0;
  page: number = 1;
  pageSize: number = 16;

  searchSchema: string = '';

  filterBy: string = '';
  filterOp: string = 'equals';
  filterValue: string = '';

  response?: CommonMessage;

  constructor(private fusio: ApiService, private route: ActivatedRoute, private error: ErrorService, private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectConnection(params['connection']);
      }

      if (params['table']) {
        this.selectTable(params['table']);
      }
    });

    try {
      const response = await this.fusio.getClient().backend().database().getConnections();
      if (response.connections) {
        this.connections = response.connections;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async selectConnection(connection: string) {
    if (this.selectedConnection === connection) {
      return;
    }

    this.selectedConnection = connection;
    this.selectedTable = undefined;

    const response = await this.fusio.getClient().backend().database().getTables(this.selectedConnection);
    if (response.tables) {
      this.tables = response.tables;

      const firstTable = this.tables[0];
      if (!this.selectedTable && firstTable) {
        this.selectTable(firstTable);
      }
    }
  }

  async selectTable(table: string) {
    if (!this.selectedConnection) {
      return;
    }

    if (this.selectedTable === table) {
      return;
    }

    this.selectedTable = table;
    this.load();
  }

  changeTab() {
    this.load();
  }

  async load(): Promise<void> {
    if (this.activeTab === 1) {
      this.loadSchema();
    } else if (this.activeTab === 2) {
      this.loadSchema();
      if (this.table?.primaryKey) {
        this.filterBy = this.table?.primaryKey;
      }
      this.loadData();
    }
  }

  async loadSchema(): Promise<void> {
    if (!this.selectedConnection || !this.selectedTable) {
      return;
    }

    if (this.selectedTable === this.table?.name) {
      return;
    }

    try {
      this.table = await this.fusio.getClient().backend().database().getTable(this.selectedConnection, this.selectedTable);
      this.columns = this.table.columns || [];
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async reloadSchema(): Promise<void> {
    if (!this.selectedConnection || !this.selectedTable) {
      return;
    }

    try {
      this.table = await this.fusio.getClient().backend().database().getTable(this.selectedConnection, this.selectedTable);
      this.columns = this.table.columns || [];

      const response = await this.fusio.getClient().backend().database().getTables(this.selectedConnection);
      if (response.tables) {
        this.tables = response.tables;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doSearchSchema() {
    if (this.searchSchema) {
      this.columns = this.columns.filter((column) => {
        let searchColumns = this.searchSchema.split(',');
        for (let i = 0; i < searchColumns.length; i++) {
          if (column.name?.includes(searchColumns[i].trim())) {
            return true;
          }
        }

        return false;
      });
    } else {
      this.columns = this.table?.columns || [];
    }
  }

  async loadData(): Promise<void> {
    if (!this.selectedConnection || !this.selectedTable) {
      return;
    }

    try {
      this.rows = await this.fusio.getClient().backend().database().getRows(this.selectedConnection, this.selectedTable, ...this.getCollectionQuery());
      this.totalResults = this.rows.totalResults || 0;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  doPageChange(page?: number) {
    this.loadData();
  }

  protected getCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.page - 1) * this.pageSize);
    query.push(this.pageSize);

    query.push(this.filterBy || '');
    query.push(this.filterOp || '');
    query.push(this.filterValue || '');

    // sortBy
    // sortOrder

    return query;
  }

  openTableCreateDialog() {
    const modalRef = this.modalService.open(TableComponent, {
      size: 'xl'
    });

    modalRef.componentInstance.mode = Mode.Create;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseTable>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.reloadSchema();
      }
    });
  }

  openTableUpdateDialog(table: BackendDatabaseTable) {
    const modalRef = this.modalService.open(TableComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.componentInstance.entity = table;
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseTable>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.reloadSchema();
      }
    });
  }

  openTableDeleteDialog(table: BackendDatabaseTable) {
    const modalRef = this.modalService.open(TableComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.mode = Mode.Delete;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.componentInstance.entity = table;
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseTable>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.reloadSchema();
      }
    });
  }

  openRowCreateDialog() {
    const modalRef = this.modalService.open(RowComponent, {
      size: 'lg'
    });

    modalRef.componentInstance.mode = Mode.Create;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.componentInstance.table = this.selectedTable;
    modalRef.componentInstance.columns = this.table?.columns || [];
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseRow>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.loadData();
      }
    });
  }

  openRowUpdateDialog(row: BackendDatabaseRow) {
    const modalRef = this.modalService.open(RowComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Update;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.componentInstance.table = this.selectedTable;
    modalRef.componentInstance.primaryKey = this.table?.primaryKey;
    modalRef.componentInstance.columns = this.table?.columns || [];
    modalRef.componentInstance.entity = row;
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseRow>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.loadData();
      }
    });
  }

  openRowDeleteDialog(row: BackendDatabaseRow) {
    const modalRef = this.modalService.open(RowComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.mode = Mode.Delete;
    modalRef.componentInstance.connection = this.selectedConnection;
    modalRef.componentInstance.table = this.selectedTable;
    modalRef.componentInstance.primaryKey = this.table?.primaryKey;
    modalRef.componentInstance.columns = this.table?.columns || [];
    modalRef.componentInstance.entity = row;
    modalRef.closed.subscribe(async (result: Result<BackendDatabaseRow>) => {
      this.response = result.response;
      if (result.response.success) {
        await this.loadData();
      }
    });
  }

}
