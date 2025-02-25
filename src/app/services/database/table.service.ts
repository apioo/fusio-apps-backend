import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendDatabaseTable, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TableService extends Service<BackendDatabaseTable> {

  private connection?: string

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

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendDatabaseTable>> {
    return this.fusio.getClient().backend().database().getTables(this.getConnection());
  }

  async get(id: string): Promise<BackendDatabaseTable> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().database().getTable(this.getConnection(), id);
  }

  async create(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().database().createTable(this.getConnection(), entity);
  }

  async update(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().database().updateTable(this.getConnection(), '' + entity.name, entity);
  }

  async delete(entity: BackendDatabaseTable): Promise<CommonMessage> {
    if (!this.connection) {
      throw new Error('No connection selected');
    }

    return this.fusio.getClient().backend().database().deleteTable(this.getConnection(), '' + entity.name);
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
    return ['/', 'database', this.getConnection()];
  }

}
