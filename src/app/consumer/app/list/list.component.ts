import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, App> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<App>>> {
    const resource = await this.fusio.getClient().getBackendApp();
    return await resource.backendActionAppGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App>> {
    const resource = await this.fusio.getClient().getBackendAppByAppId(id);
    return await resource.backendActionAppGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/app';
  }

}
