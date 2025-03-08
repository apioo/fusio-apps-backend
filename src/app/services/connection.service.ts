import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendConnection,
  BackendConnectionCreate,
  BackendConnectionUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService extends Service<BackendConnection> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendConnection>> {
    return this.fusio.getClient().backend().connection().getAll(...parameters);
  }

  async get(id: string): Promise<BackendConnection> {
    return this.fusio.getClient().backend().connection().get(id);
  }

  async create(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().create(<BackendConnectionCreate> entity);
  }

  async update(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().update('' + entity.id, <BackendConnectionUpdate> entity);
  }

  async delete(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().delete('' + entity.id);
  }

  newEntity(): BackendConnection {
    return {
      name: '',
      class: '',
      config: {}
    };
  }

  getLink(): Array<string> {
    return ['/', 'connection'];
  }

}
