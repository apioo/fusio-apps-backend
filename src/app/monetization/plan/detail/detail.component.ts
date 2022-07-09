import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Plan> {

  periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }];

  protected async create(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlan().backendActionPlanCreate(entity);
  }

  protected async update(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlanByPlanId('' + entity.id).backendActionPlanUpdate(entity);
  }

  protected async delete(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlanByPlanId('' + entity.id).backendActionPlanDelete();
  }

  protected newEntity(): Plan {
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

}
