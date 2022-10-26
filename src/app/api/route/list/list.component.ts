import {Component} from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {AxiosResponse} from "axios";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-route-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, ModelRoute> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<ModelRoute>>> {
    const resource = await this.fusio.getClient().getBackendRoutes();
    return await resource.backendActionRouteGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<ModelRoute>> {
    const resource = await this.fusio.getClient().getBackendRoutesByRouteId(id);
    return await resource.backendActionRouteGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/route';
  }

}
