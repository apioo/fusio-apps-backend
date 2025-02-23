import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendDatabaseRow, BackendDatabaseTable, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class RowService extends Service<BackendDatabaseRow> {

  private connection?: string
  private table?: BackendDatabaseTable

  constructor(private fusio: FusioService) {
    super();
  }

  public setConnection(connection: string): void {
    this.connection = connection;
  }

  private getConnection(): string {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.connection;
  }

  public setTable(table: BackendDatabaseTable): void {
    this.table = table;
  }

  private getTable(): BackendDatabaseTable {
    if (!this.table) {
      throw new Error('No table selected');
    }

    return this.table;
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendDatabaseRow>> {
    return this.fusio.getClient().backend().database().getRows(this.getConnection(), this.table?.name || '', ...parameters);
  }

  async get(id: string): Promise<BackendDatabaseRow> {
    return this.fusio.getClient().backend().database().getRow(this.getConnection(), this.table?.name || '', id);
  }

  async create(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().createRow(this.getConnection(), this.table?.name || '', entity);
  }

  async update(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().updateRow(this.getConnection(), this.table?.name || '', '' + entity['id'], entity);
  }

  async delete(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().database().deleteRow(this.getConnection(), this.table?.name || '', '' + entity['id']);
  }

  newEntity(): BackendDatabaseRow {
    let row: BackendDatabaseRow = {};
    if (this.table?.columns) {
      for (let col of this.table.columns) {
        if (col.name) {
          row[col.name] = null;
        }
      }
    }

    return row;
  }

  getLink(): Array<string> {
    return ['/', 'database', this.getConnection(), this.table?.name || ''];
  }

}
