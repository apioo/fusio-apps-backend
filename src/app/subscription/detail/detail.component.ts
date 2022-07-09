import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/backend/Event_Subscription";
import {Detail} from "../../detail";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event_Subscription> {

  events?: Array<Event>;
  users?: Array<User>;

  override async ngOnInit(): Promise<void> {
    this.loadEvents();
    this.loadUsers();
  }

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

  private async loadEvents() {
    const event = await this.factory.getClient().backendEvent();
    const response = await event.getBackendEvent().backendActionEventGetAll({count: 1024});
    this.events = response.data.entry;
  }

  private async loadUsers() {
    const user = await this.factory.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

}
