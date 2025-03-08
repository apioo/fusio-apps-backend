import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendRole, BackendRoleCreate, BackendRoleUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends Service<BackendRole> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendRole>> {
    return this.fusio.getClient().backend().role().getAll(...parameters);
  }

  async get(id: string): Promise<BackendRole> {
    return this.fusio.getClient().backend().role().get(id);
  }

  async create(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().create(<BackendRoleCreate> entity);
  }

  async update(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().update('' + entity.id, <BackendRoleUpdate> entity);
  }

  async delete(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().delete('' + entity.id);
  }

  newEntity(): BackendRole {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'role'];
  }

}
