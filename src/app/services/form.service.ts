import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendForm, BackendFormCreate, BackendFormUpdate,
  BackendPage,
  BackendPageCreate,
  BackendPageUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class FormService extends Service<BackendForm> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendForm>> {
    return this.fusio.getClient().backend().form().getAll(...parameters);
  }

  async get(id: string): Promise<BackendForm> {
    return this.fusio.getClient().backend().form().get(id);
  }

  async create(entity: BackendForm): Promise<CommonMessage> {
    return this.fusio.getClient().backend().form().create(<BackendFormCreate> entity);
  }

  async update(entity: BackendForm): Promise<CommonMessage> {
    return this.fusio.getClient().backend().form().update('' + entity.id, <BackendFormUpdate> entity);
  }

  async delete(entity: BackendForm): Promise<CommonMessage> {
    return this.fusio.getClient().backend().form().delete('' + entity.id);
  }

  newEntity(): BackendForm {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'form'];
  }

}
