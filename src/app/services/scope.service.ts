import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendScope, BackendScopeCreate, BackendScopeUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ScopeService extends Service<BackendScope> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendScope>> {
    return this.fusio.getClient().backend().scope().getAll(...parameters);
  }

  async get(id: string): Promise<BackendScope> {
    return this.fusio.getClient().backend().scope().get(id);
  }

  async create(entity: BackendScope): Promise<CommonMessage> {
    return this.fusio.getClient().backend().scope().create(<BackendScopeCreate> entity);
  }

  async update(entity: BackendScope): Promise<CommonMessage> {
    return this.fusio.getClient().backend().scope().update('' + entity.id, <BackendScopeUpdate> entity);
  }

  async delete(entity: BackendScope): Promise<CommonMessage> {
    return this.fusio.getClient().backend().scope().delete('' + entity.id);
  }

  newEntity(): BackendScope {
    return {
      name: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'scope'];
  }

}
