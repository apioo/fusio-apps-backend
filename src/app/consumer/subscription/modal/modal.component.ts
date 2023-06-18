import { Component, OnInit } from '@angular/core';
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
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

  protected async create(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().event().createSubscription(entity);
  }

  protected async update(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().event().updateSubscription('' + entity.id, entity);
  }

  protected async delete(entity: EventSubscription): Promise<Message> {
    return this.fusio.getClient().event().deleteSubscription('' + entity.id);
  }

  protected newEntity(): EventSubscription {
    return {
      endpoint: ''
    };
  }

  private async loadEvents() {
    const response = await this.fusio.getClient().event().getAll(0, 1024);
    this.events = response.entry;
  }

  private async loadUsers() {
    const response = await this.fusio.getClient().user().getAll(0, 1024);
    this.users = response.entry;
  }

}
