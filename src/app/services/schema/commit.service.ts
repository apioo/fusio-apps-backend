import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendAction, BackendActionCommit, BackendSchemaCommit, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class CommitService extends Service<BackendSchemaCommit> {

  private schemaId: string|undefined = undefined;

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendSchemaCommit>> {
    return this.fusio.getClient().backend().schema().getCommits(this.getSchemaId(), ...parameters);
  }

  async get(id: string): Promise<BackendSchemaCommit> {
    return {};
  }

  async create(entity: BackendSchemaCommit): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendSchemaCommit): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendSchemaCommit): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendSchemaCommit {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'action', 'commit', ''];
  }

  override isConfigured(): boolean {
    return this.schemaId !== undefined;
  }

  setSchemaId(schemaId: string) {
    this.schemaId = schemaId;
    this.checkConfiguration();
  }

  private getSchemaId(): string {
    if (this.schemaId === undefined) {
      throw new Error('No schema id configured');
    }

    return this.schemaId;
  }
}
