import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendCronjob, BackendCronjobCreate, BackendCronjobUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class CronjobService extends Service<BackendCronjob> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendCronjob>> {
    return this.fusio.getClient().backend().cronjob().getAll(...parameters);
  }

  async get(id: string): Promise<BackendCronjob> {
    return this.fusio.getClient().backend().cronjob().get(id);
  }

  async create(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().create(<BackendCronjobCreate> entity);
  }

  async update(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().update('' + entity.id, <BackendCronjobUpdate> entity);
  }

  async delete(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().delete('' + entity.id);
  }

  newEntity(): BackendCronjob {
    return {
      name: '',
      cron: '',
      action: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'cronjob'];
  }

}
