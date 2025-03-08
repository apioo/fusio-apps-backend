import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendPage, BackendPageCreate, BackendPageUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class PageService extends Service<BackendPage> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendPage>> {
    return this.fusio.getClient().backend().page().getAll(...parameters);
  }

  async get(id: string): Promise<BackendPage> {
    return this.fusio.getClient().backend().page().get(id);
  }

  async create(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().create(<BackendPageCreate> entity);
  }

  async update(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().update('' + entity.id, <BackendPageUpdate> entity);
  }

  async delete(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().delete('' + entity.id);
  }

  newEntity(): BackendPage {
    return {
      status: 1,
      title: '',
      content: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'page'];
  }

}
