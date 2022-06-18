import { Component, OnInit } from '@angular/core';
import {Detail} from "../../detail";
import {App} from "fusio-sdk/src/generated/backend/App";
import {Action} from "fusio-sdk/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App> {

  protected async create(entity: Action): Promise<AxiosResponse<Message>> {
    const app = await this.factory.getClient().backendApp();
    return await app.getBackendApp().backendActionAppCreate(entity);
  }

  protected async update(entity: Action): Promise<AxiosResponse<Message>> {
    const app = await this.factory.getClient().backendApp();
    return await app.getBackendAppByAppId('' + entity.id).backendActionAppUpdate(entity);
  }

  protected async delete(entity: Action): Promise<AxiosResponse<Message>> {
    const app = await this.factory.getClient().backendApp();
    return await app.getBackendAppByAppId('' + entity.id).backendActionAppDelete();
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
