import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendPlan, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-plan-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendPlan> {

  periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }];

  protected async create(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().create(entity);
  }

  protected async update(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendPlan): Promise<CommonMessage> {
    return this.fusio.getClient().backend().plan().delete('' + entity.id);
  }

  protected newEntity(): BackendPlan {
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
