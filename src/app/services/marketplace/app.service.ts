import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {CommonCollection, CommonMessage, MarketplaceApp} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AppService extends Service<MarketplaceApp> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<MarketplaceApp>> {
    return this.fusio.getClient().backend().marketplace().app().getAll(parameters[0], parameters[2]);
  }

  async get(id: string): Promise<MarketplaceApp> {
    const parts = id.split('-', 2);
    if (parts.length !== 2) {
      throw new Error('Provided an invalid id');
    }

    return this.fusio.getClient().backend().marketplace().app().get(parts[0], parts[1]);
  }

  async create(entity: MarketplaceApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().app().install({
      name: entity.author?.name + '/' + entity.name
    });
  }

  async update(entity: MarketplaceApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().app().upgrade('' + entity.author?.name, '' + entity.name);
  }

  async delete(entity: MarketplaceApp): Promise<CommonMessage> {
    return {};
  }

  newEntity(): MarketplaceApp {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'marketplace', 'app'];
  }

}
