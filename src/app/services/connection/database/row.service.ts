import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseRow, BackendDatabaseTable, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class RowService extends Service<BackendDatabaseRow> {

  private connection?: BackendConnection
  private table?: BackendDatabaseTable

  constructor(private fusio: FusioService) {
    super();
  }

  public setConnection(connection: BackendConnection): void {
    this.connection = connection;
    this.checkConfiguration();
  }

  private getConnection(): string {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return '' + this.connection.id;
  }

  public setTable(table: BackendDatabaseTable): void {
    this.table = table;
    this.checkConfiguration();
  }

  private getTable(): string {
    if (!this.table) {
      throw new Error('No table selected');
    }

    return this.table.name || '';
  }

  public override isConfigured(): boolean {
    return this.connection !== undefined && this.table !== undefined;
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendDatabaseRow>> {
    return this.fusio.getClient().backend().connection().database().getRows(this.getConnection(), this.getTable(), ...parameters);
  }

  async get(id: string): Promise<BackendDatabaseRow> {
    return this.fusio.getClient().backend().connection().database().getRow(this.getConnection(), this.getTable() || '', id);
  }

  async create(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().database().createRow(this.getConnection(), this.getTable() || '', entity);
  }

  async update(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().database().updateRow(this.getConnection(), this.getTable() || '', '' + entity['id'], entity);
  }

  async delete(entity: BackendDatabaseRow): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().database().deleteRow(this.getConnection(), this.getTable() || '', '' + entity['id']);
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
    return ['/', 'connection', this.getConnection(), 'database', this.getTable(), 'data'];
  }

}
