import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendTaxonomy,
  BackendTaxonomyCreate,
  BackendTaxonomyUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TaxonomyService extends Service<BackendTaxonomy> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendTaxonomy>> {
    return this.fusio.getClient().backend().taxonomy().getAll(...parameters);
  }

  async get(id: string): Promise<BackendTaxonomy> {
    return this.fusio.getClient().backend().taxonomy().get(id);
  }

  async create(entity: BackendTaxonomy): Promise<CommonMessage> {
    return this.fusio.getClient().backend().taxonomy().create(<BackendTaxonomyCreate> entity);
  }

  async update(entity: BackendTaxonomy): Promise<CommonMessage> {
    return this.fusio.getClient().backend().taxonomy().update('' + entity.id, <BackendTaxonomyUpdate> entity);
  }

  async delete(entity: BackendTaxonomy): Promise<CommonMessage> {
    return this.fusio.getClient().backend().taxonomy().delete('' + entity.id);
  }

  newEntity(): BackendTaxonomy {
    return {
      name: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'taxonomy'];
  }

}
