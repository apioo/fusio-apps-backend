import { Component, OnInit } from '@angular/core';
import {Detail} from "../../../detail";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {User} from "fusio-sdk/dist/src/generated/backend/User";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App> {

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
    const user = await this.factory.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

  protected async create(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendApp().backendActionAppCreate(entity);
  }

  protected async update(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppByAppId('' + entity.id).backendActionAppUpdate(entity);
  }

  protected async delete(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendApp();
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
