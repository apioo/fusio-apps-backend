import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendApp} from "fusio-sdk/dist/BackendApp";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendApp> {

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

  protected async create(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().create(entity);
  }

  protected async update(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendApp): Promise<CommonMessage> {
    return this.fusio.getClient().backend().app().delete('' + entity.id);
  }

  protected newEntity(): BackendApp {
    return {
      status: 1,
      name: '',
      url: '',
      scopes: []
    };
  }

}
