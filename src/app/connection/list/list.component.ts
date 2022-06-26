import {Component} from '@angular/core';
import {List} from "../../list";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../../config/detail/detail.component";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Connection> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Connection>>> {
    const group = await this.factory.getClient().backendConnection();
    return await group.getBackendConnection().backendActionConnectionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Connection>> {
    const group = await this.factory.getClient().backendConnection();
    return await group.getBackendConnectionByConnectionId(id).backendActionConnectionGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/connection';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
