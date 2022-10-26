import {Component} from '@angular/core';
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

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

  users?: Array<User>;

  override async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendUser();
    const response = await resource.backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

  protected async create(entity: App): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendApp();
    return await resource.backendActionAppCreate(entity);
  }

  protected async update(entity: App): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendAppByAppId('' + entity.id);
    return await resource.backendActionAppUpdate(entity);
  }

  protected async delete(entity: App): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendAppByAppId('' + entity.id);
    return await resource.backendActionAppDelete();
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
