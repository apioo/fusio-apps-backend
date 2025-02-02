import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendAction, BackendActionCreate, BackendActionUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ActionService extends Service<BackendAction> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendAction>> {
    return this.fusio.getClient().backend().action().getAll(...parameters);
  }

  async get(id: string): Promise<BackendAction> {
    return this.fusio.getClient().backend().action().get(id);
  }

  async create(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().create(<BackendActionCreate> entity);
  }

  async update(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().update('' + entity.id, <BackendActionUpdate> entity);
  }

  async delete(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().delete('' + entity.id);
  }

  newEntity(): BackendAction {
    return {
      name: '',
      class: '',
      async: false,
      config: {}
    };
  }

  getLink(): Array<string> {
    return ['/', 'action'];
  }

}
