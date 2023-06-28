import {Component} from '@angular/core';
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, App> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Pending'
  }, {
    key: 3,
    value: 'Deactivated'
  }];

  protected async create(entity: App): Promise<Message> {
    return this.fusio.getClient().app().create(entity);
  }

  protected async update(entity: App): Promise<Message> {
    return this.fusio.getClient().app().update('' + entity.id, entity);
  }

  protected async delete(entity: App): Promise<Message> {
    return this.fusio.getClient().app().delete('' + entity.id);
  }

  protected newEntity(): App {
    return {
      status: 1,
      name: '',
      url: '',
      scopes: []
    };
  }

}
