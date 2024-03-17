import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendEvent, BackendEventSubscription, BackendUser, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-subscription-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendEventSubscription> {

  events?: Array<BackendEvent>;
  users?: Array<BackendUser>;

  override async ngOnInit(): Promise<void> {
    this.loadEvents();
    this.loadUsers();
  }

  protected async create(entity: BackendEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().createSubscription(entity);
  }

  protected async update(entity: BackendEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().updateSubscription('' + entity.id, entity);
  }

  protected async delete(entity: BackendEventSubscription): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().deleteSubscription('' + entity.id);
  }

  protected newEntity(): BackendEventSubscription {
    return {
      endpoint: ''
    };
  }

  private async loadEvents() {
    const response = await this.fusio.getClient().backend().event().getAll(0, 1024);
    this.events = response.entry;
  }

  private async loadUsers() {
    const response = await this.fusio.getClient().backend().user().getAll(0, 1024);
    this.users = response.entry;
  }

}
