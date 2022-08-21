import {Component} from '@angular/core';
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-plan-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Plan> {

  periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }];

  protected async create(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendPlan();
    return await group.getBackendPlan().backendActionPlanCreate(entity);
  }

  protected async update(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendPlan();
    return await group.getBackendPlanByPlanId('' + entity.id).backendActionPlanUpdate(entity);
  }

  protected async delete(entity: Plan): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendPlan();
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
