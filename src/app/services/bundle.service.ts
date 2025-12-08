import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendBundle, BackendBundleCreate,
  BackendCategory,
  BackendCategoryCreate,
  BackendCategoryUpdate, BackendEventUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class BundleService extends Service<BackendBundle> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendBundle>> {
    return this.fusio.getClient().backend().bundle().getAll(...parameters);
  }

  async get(id: string): Promise<BackendBundle> {
    return this.fusio.getClient().backend().bundle().get(id);
  }

  async create(entity: BackendBundle): Promise<CommonMessage> {
    return this.fusio.getClient().backend().bundle().create(<BackendBundleCreate> entity);
  }

  async update(entity: BackendBundle): Promise<CommonMessage> {
    return this.fusio.getClient().backend().bundle().update('' + entity.id, <BackendEventUpdate> entity);
  }

  async delete(entity: BackendBundle): Promise<CommonMessage> {
    return this.fusio.getClient().backend().bundle().delete('' + entity.id);
  }

  newEntity(): BackendBundle {
    return {
      name: '',
      version: '0.1.0',
      summary: '',
      description: '',
      cost: 0,
      config: {
        actions: [],
        schemas: [],
        events: [],
        cronjobs: [],
        triggers: [],
      },
    };
  }

  getLink(): Array<string> {
    return ['/', 'bundle'];
  }

}
