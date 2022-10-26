import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Connection> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Connection>>> {
    const resource = await this.fusio.getClient().getBackendConnection();
    return await resource.backendActionConnectionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Connection>> {
    const resource = await this.fusio.getClient().getBackendConnectionByConnectionId(id);
    return await resource.backendActionConnectionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/connection';
  }

}
