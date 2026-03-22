import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendAction, BackendActionCommit, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class CommitService extends Service<BackendActionCommit> {

  private actionId: string|undefined = undefined;

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendActionCommit>> {
    return this.fusio.getClient().backend().action().getCommits(this.getActionId(), ...parameters);
  }

  async get(id: string): Promise<BackendActionCommit> {
    return {};
  }

  async create(entity: BackendActionCommit): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendActionCommit): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendActionCommit): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendActionCommit {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'action', 'commit', ''];
  }

  override isConfigured(): boolean {
    return this.actionId !== undefined;
  }

  setActionId(actionId: string) {
    this.actionId = actionId;
    this.checkConfiguration();
  }

  private getActionId(): string {
    if (this.actionId === undefined) {
      throw new Error('No action id configured');
    }

    return this.actionId;
  }
}
