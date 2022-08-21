import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Connection> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Connection>>> {
    const group = await this.fusio.getClient().backendConnection();
    return await group.getBackendConnection().backendActionConnectionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Connection>> {
    const group = await this.fusio.getClient().backendConnection();
    return await group.getBackendConnectionByConnectionId(id).backendActionConnectionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/connection';
  }

}
