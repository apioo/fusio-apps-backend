import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {CommonCollection, CommonMessage, MarketplaceAction, MarketplaceBundle} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class BundleService extends Service<MarketplaceBundle> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<MarketplaceBundle>> {
    return this.fusio.getClient().backend().marketplace().bundle().getAll(parameters[0], parameters[2]);
  }

  async get(id: string): Promise<MarketplaceBundle> {
    const parts = id.split('-', 2);
    if (parts.length !== 2) {
      throw new Error('Provided an invalid id');
    }

    return this.fusio.getClient().backend().marketplace().bundle().get(parts[0], parts[1]);
  }

  async create(entity: MarketplaceBundle): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().bundle().install({
      name: entity.author?.name + '/' + entity.name
    });
  }

  async update(entity: MarketplaceBundle): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().bundle().upgrade('' + entity.author?.name, '' + entity.name);
  }

  async delete(entity: MarketplaceBundle): Promise<CommonMessage> {
    return {};
  }

  newEntity(): MarketplaceBundle {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'marketplace', 'bundle'];
  }

}
