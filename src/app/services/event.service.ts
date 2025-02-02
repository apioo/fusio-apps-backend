import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendEvent, BackendEventCreate, BackendEventUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class EventService extends Service<BackendEvent> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendEvent>> {
    return this.fusio.getClient().backend().event().getAll(...parameters);
  }

  async get(id: string): Promise<BackendEvent> {
    return this.fusio.getClient().backend().event().get(id);
  }

  async create(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().create(<BackendEventCreate> entity);
  }

  async update(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().update('' + entity.id, <BackendEventUpdate> entity);
  }

  async delete(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().delete('' + entity.id);
  }

  newEntity(): BackendEvent {
    return {
      name: '',
      description: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'event'];
  }

}
