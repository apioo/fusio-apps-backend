import { Component, OnInit } from '@angular/core';
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/backend/Event_Subscription";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Event_Subscription> {

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
