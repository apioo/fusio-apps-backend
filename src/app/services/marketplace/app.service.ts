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
    const pos = id.indexOf('-');
    const user = id.substring(0, pos);
    const name = id.substring(pos + 1);

    return this.fusio.getClient().backend().marketplace().app().get(user, name);
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
