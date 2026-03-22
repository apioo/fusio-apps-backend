import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendAgent, BackendAgentCreate, BackendAgentUpdate,
  BackendCategory,
  BackendCategoryCreate,
  BackendCategoryUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AgentService extends Service<BackendAgent> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendAgent>> {
    return this.fusio.getClient().backend().agent().getAll(...parameters);
  }

  async get(id: string): Promise<BackendAgent> {
    return this.fusio.getClient().backend().agent().get(id);
  }

  async create(entity: BackendAgent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().agent().create(<BackendAgentCreate> entity);
  }

  async update(entity: BackendAgent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().agent().update('' + entity.id, <BackendAgentUpdate> entity);
  }

  async delete(entity: BackendAgent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().agent().delete('' + entity.id);
  }

  newEntity(): BackendAgent {
    return {
      name: '',
      description: '',
      introduction: '',
    };
  }

  getLink(): Array<string> {
    return ['/', 'agent'];
  }

}
