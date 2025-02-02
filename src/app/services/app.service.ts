import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendApp, BackendAppCreate, BackendAppUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AppService extends Service<BackendApp> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendApp>> {
    return this.fusio.getClient().backend().app().getAll(...parameters);
  }

  async get(id: string): Promise<BackendApp> {
    return this.fusio.getClient().backend().app().get(id);
  }

  async create(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().create(<BackendAppCreate> entity);
  }

  async update(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().update('' + entity.id, <BackendAppUpdate> entity);
  }

  async delete(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().delete('' + entity.id);
  }

  newEntity(): BackendApp {
    return {
      status: 1,
      name: '',
      url: '',
      scopes: []
    };
  }

  getLink(): Array<string> {
    return ['/', 'app'];
  }

}
