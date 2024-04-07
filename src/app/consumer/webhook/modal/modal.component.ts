import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendWebhook} from "fusio-sdk/dist/BackendWebhook";
import {BackendEvent} from "fusio-sdk/dist/BackendEvent";
import {BackendUser} from "fusio-sdk/dist/BackendUser";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-webhook-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendWebhook> {

  events?: Array<BackendEvent>;
  users?: Array<BackendUser>;

  override async ngOnInit(): Promise<void> {
    this.loadEvents();
    this.loadUsers();
  }

  protected async create(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().webhook().create(entity);
  }

  protected async update(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().webhook().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendWebhook): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().delete('' + entity.id);
  }

  protected newEntity(): BackendWebhook {
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
