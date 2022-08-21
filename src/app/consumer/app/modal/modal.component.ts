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
    const user = await this.fusio.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

  protected async create(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendApp();
    return await group.getBackendApp().backendActionAppCreate(entity);
  }

  protected async update(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendApp();
    return await group.getBackendAppByAppId('' + entity.id).backendActionAppUpdate(entity);
  }

  protected async delete(entity: App): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendApp();
    return await group.getBackendAppByAppId('' + entity.id).backendActionAppDelete();
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
