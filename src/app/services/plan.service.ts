import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendPlan, BackendPlanCreate, BackendPlanUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class PlanService extends Service<BackendPlan> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendPlan>> {
    return this.fusio.getClient().backend().plan().getAll(...parameters);
  }

  async get(id: string): Promise<BackendPlan> {
    return this.fusio.getClient().backend().plan().get(id);
  }

  async create(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().create(<BackendPlanCreate> entity);
  }

  async update(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().update('' + entity.id, <BackendPlanUpdate> entity);
  }

  async delete(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().delete('' + entity.id);
  }

  newEntity(): BackendPlan {
    return {
      name: '',
      description: '',
      price: 0,
      points: 0,
      period: 0,
      externalId: '',
      scopes: []
    };
  }

  getLink(): Array<string> {
    return ['/', 'plan'];
  }

}
