import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendFirewall,
  BackendFirewallCreate,
  BackendFirewallUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class FirewallService extends Service<BackendFirewall> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendFirewall>> {
    return this.fusio.getClient().backend().firewall().getAll(...parameters);
  }

  async get(id: string): Promise<BackendFirewall> {
    return this.fusio.getClient().backend().firewall().get(id);
  }

  async create(entity: BackendFirewall): Promise<CommonMessage> {
    if (entity.expire) {
      entity.expire = (new Date(entity.expire)).toISOString();
    } else {
      entity.expire = undefined;
    }

    return this.fusio.getClient().backend().firewall().create(<BackendFirewallCreate> entity);
  }

  async update(entity: BackendFirewall): Promise<CommonMessage> {
    if (entity.expire) {
      entity.expire = (new Date(entity.expire)).toISOString();
    } else {
      entity.expire = undefined;
    }

    return this.fusio.getClient().backend().firewall().update('' + entity.id, <BackendFirewallUpdate> entity);
  }

  async delete(entity: BackendFirewall): Promise<CommonMessage> {
    return this.fusio.getClient().backend().firewall().delete('' + entity.id);
  }

  newEntity(): BackendFirewall {
    return {
      name: '',
      type: 0,
      ip: '',
      expire: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'firewall'];
  }

}
