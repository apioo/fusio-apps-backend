import { Component, OnInit } from '@angular/core';
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {EventSubscription} from "fusio-sdk/dist/src/generated/backend/EventSubscription";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, EventSubscription> {

  events?: Array<Event>;
  users?: Array<User>;

  override async ngOnInit(): Promise<void> {
    this.loadEvents();
    this.loadUsers();
  }

  protected async create(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEventSubscription();
    return await resource.backendActionEventSubscriptionCreate(entity);
  }

  protected async update(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEventSubscriptionBySubscriptionId('' + entity.id);
    return await resource.backendActionEventSubscriptionUpdate(entity);
  }

  protected async delete(entity: EventSubscription): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEventSubscriptionBySubscriptionId('' + entity.id);
    return await resource.backendActionEventSubscriptionDelete();
  }

  protected newEntity(): EventSubscription {
    return {
      endpoint: ''
    };
  }

  private async loadEvents() {
    const resource = await this.fusio.getClient().getBackendEvent();
    const response = await resource.backendActionEventGetAll({count: 1024});
    this.events = response.data.entry;
  }

  private async loadUsers() {
    const resource = await this.fusio.getClient().getBackendUser();
    const response = await resource.backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

}
