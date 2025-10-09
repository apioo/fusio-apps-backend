import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendTrigger, BackendTriggerCreate, BackendTriggerUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TriggerService extends Service<BackendTrigger> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendTrigger>> {
    return this.fusio.getClient().backend().trigger().getAll(...parameters);
  }

  async get(id: string): Promise<BackendTrigger> {
    return this.fusio.getClient().backend().trigger().get(id);
  }

  async create(entity: BackendTrigger): Promise<CommonMessage> {
    return this.fusio.getClient().backend().trigger().create(<BackendTriggerCreate> entity);
  }

  async update(entity: BackendTrigger): Promise<CommonMessage> {
    return this.fusio.getClient().backend().trigger().update('' + entity.id, <BackendTriggerUpdate> entity);
  }

  async delete(entity: BackendTrigger): Promise<CommonMessage> {
    return this.fusio.getClient().backend().trigger().delete('' + entity.id);
  }

  newEntity(): BackendTrigger {
    return {
      name: '',
      event: '',
      action: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'trigger'];
  }

}
