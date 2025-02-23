import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendConfig, BackendConfigUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends Service<BackendConfig> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendConfig>> {
    return this.fusio.getClient().backend().config().getAll(...parameters);
  }

  async get(id: string): Promise<BackendConfig> {
    return this.fusio.getClient().backend().config().get(id);
  }

  async create(entity: BackendConfig): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendConfig): Promise<CommonMessage> {
    return this.fusio.getClient().backend().config().update('' + entity.id, <BackendConfigUpdate> entity);
  }

  async delete(entity: BackendConfig): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendConfig {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'config'];
  }

}
