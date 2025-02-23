import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendCategory,
  BackendCategoryCreate,
  BackendCategoryUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends Service<BackendCategory> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendCategory>> {
    return this.fusio.getClient().backend().category().getAll(...parameters);
  }

  async get(id: string): Promise<BackendCategory> {
    return this.fusio.getClient().backend().category().get(id);
  }

  async create(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().create(<BackendCategoryCreate> entity);
  }

  async update(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().update('' + entity.id, <BackendCategoryUpdate> entity);
  }

  async delete(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().delete('' + entity.id);
  }

  newEntity(): BackendCategory {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'category'];
  }

}
