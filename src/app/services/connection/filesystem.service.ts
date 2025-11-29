import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseTable, BackendFile, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class FilesystemService extends Service<BackendFile> {

  private connection?: BackendConnection

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

  public override isConfigured(): boolean {
    return this.connection !== undefined;
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendFile>> {
    return this.fusio.getClient().backend().connection().filesystem().getAll(this.getConnection());
  }

  async get(id: string): Promise<BackendFile> {
    throw new Error('Not supported');
  }

  async create(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendDatabaseTable): Promise<CommonMessage> {
    return {};
  }

  async download(id: string): Promise<ArrayBuffer> {
    return this.fusio.getClient().backend().connection().filesystem().get(this.getConnection(), id);
  }

  async upload(payload: FormData): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().filesystem().create(this.getConnection(), payload)
  }

  newEntity(): BackendFile {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'filesystem', this.getConnection()];
  }

}
