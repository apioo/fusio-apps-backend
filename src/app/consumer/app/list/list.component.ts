import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, App> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<App>>> {
    const group = await this.fusio.getClient().backendApp();
    return await group.getBackendApp().backendActionAppGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App>> {
    const group = await this.fusio.getClient().backendApp();
    return await group.getBackendAppByAppId(id).backendActionAppGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/app';
  }

}
