import {Component} from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {AxiosResponse} from "axios";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-route-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, ModelRoute> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<ModelRoute>>> {
    const group = await this.fusio.getClient().backendRoute();
    return await group.getBackendRoutes().backendActionRouteGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<ModelRoute>> {
    const group = await this.fusio.getClient().backendRoute();
    return await group.getBackendRoutesByRouteId(id).backendActionRouteGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/route';
  }

}
