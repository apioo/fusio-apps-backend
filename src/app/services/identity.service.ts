import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendIdentity,
  BackendIdentityCreate,
  BackendIdentityUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends Service<BackendIdentity> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendIdentity>> {
    return this.fusio.getClient().backend().identity().getAll(...parameters);
  }

  async get(id: string): Promise<BackendIdentity> {
    return this.fusio.getClient().backend().identity().get(id);
  }

  async create(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().create(<BackendIdentityCreate> entity);
  }

  async update(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().update('' + entity.id, <BackendIdentityUpdate> entity);
  }

  async delete(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().delete('' + entity.id);
  }

  newEntity(): BackendIdentity {
    return {
      name: '',
      icon: '',
      class: '',
      allowCreate: true
    };
  }

  getLink(): Array<string> {
    return ['/', 'identity'];
  }

}
