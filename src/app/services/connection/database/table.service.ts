import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseTable, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TableService extends Service<BackendDatabaseTable> {

  private connection?: BackendConnection

  constructor(private fusio: FusioService) {
    super();
  }

  public setConnection(connection: BackendConnection): void {
    this.connection = connection;
  }

  private getConnection(): string {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return '' + this.connection.id;
  }

  public isConfigured(): boolean {
    return this.connection !== undefined;
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendDatabaseTable>> {
    return this.fusio.getClient().backend().connection().database().getTables(this.getConnection());
  }

  async get(id: string): Promise<BackendDatabaseTable> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().connection().database().getTable(this.getConnection(), id);
  }

  async create(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().connection().database().createTable(this.getConnection(), entity);
  }

  async update(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().connection().database().updateTable(this.getConnection(), '' + entity.name, entity);
  }

  async delete(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().connection().database().deleteTable(this.getConnection(), '' + entity.name);
  }

  newEntity(): BackendDatabaseTable {
    return {
      name: '',
      columns: [],
      indexes: [],
      foreignKeys: [],
    };
  }

  getLink(): Array<string> {
    return ['/', 'connection', this.getConnection(), 'database'];
  }

}
