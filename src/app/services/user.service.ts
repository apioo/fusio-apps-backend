import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendUser, BackendUserCreate, BackendUserUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class UserService extends Service<BackendUser> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendUser>> {
    return this.fusio.getClient().backend().user().getAll(...parameters);
  }

  async get(id: string): Promise<BackendUser> {
    return this.fusio.getClient().backend().user().get(id);
  }

  async create(entity: BackendUser): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().create(<BackendUserCreate> entity);
  }

  async update(entity: BackendUser): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().update('' + entity.id, <BackendUserUpdate> entity);
  }

  async delete(entity: BackendUser): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().delete('' + entity.id);
  }

  newEntity(): BackendUser {
    return {
      status: 1,
      roleId: 0,
      name: '',
      email: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'user'];
  }

}
