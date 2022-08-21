import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Role> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Role>>> {
    const group = await this.fusio.getClient().backendRole();
    return await group.getBackendRole().backendActionRoleGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Role>> {
    const group = await this.fusio.getClient().backendRole();
    return await group.getBackendRoleByRoleId(id).backendActionRoleGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/role';
  }

}
