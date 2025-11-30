import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {CommonCollection, CommonMessage, MarketplaceAction} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ActionService extends Service<MarketplaceAction> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<MarketplaceAction>> {
    return this.fusio.getClient().backend().marketplace().action().getAll(parameters[0], parameters[2]);
  }

  async get(id: string): Promise<MarketplaceAction> {
    const parts = id.split('-', 2);
    if (parts.length !== 2) {
      throw new Error('Provided an invalid id');
    }

    return this.fusio.getClient().backend().marketplace().action().get(parts[0], parts[1]);
  }

  async create(entity: MarketplaceAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().action().install({
      name: entity.author?.name + '/' + entity.name
    });
  }

  async update(entity: MarketplaceAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().marketplace().action().upgrade('' + entity.author?.name, '' + entity.name);
  }

  async delete(entity: MarketplaceAction): Promise<CommonMessage> {
    return {};
  }

  newEntity(): MarketplaceAction {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'marketplace', 'action'];
  }

}
