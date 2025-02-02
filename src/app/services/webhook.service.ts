import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendWebhook, BackendWebhookCreate, BackendWebhookUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class WebhookService extends Service<BackendWebhook> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendWebhook>> {
    return this.fusio.getClient().backend().webhook().getAll(...parameters);
  }

  async get(id: string): Promise<BackendWebhook> {
    return this.fusio.getClient().backend().webhook().get(id);
  }

  async create(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().webhook().create(<BackendWebhookCreate> entity);
  }

  async update(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().webhook().update('' + entity.id, <BackendWebhookUpdate> entity);
  }

  async delete(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().webhook().delete('' + entity.id);
  }

  newEntity(): BackendWebhook {
    return {
      name: '',
      endpoint: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'webhook'];
  }

}
