import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/backend/Event_Subscription";
import {Detail} from "../../detail";

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event_Subscription> {

  protected async create(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventSubscription().backendActionEventSubscriptionCreate(entity);
  }

  protected async update(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventSubscriptionBySubscriptionId('' + entity.id).backendActionEventSubscriptionUpdate(entity);
  }

  protected async delete(entity: Event_Subscription): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventSubscriptionBySubscriptionId('' + entity.id).backendActionEventSubscriptionDelete();
  }

  protected newEntity(): Event_Subscription {
    return {
      endpoint: ''
    };
  }

}
