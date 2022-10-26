import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Role> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Role>>> {
    const group = await this.fusio.getClient().getBackendRole();
    return await group.backendActionRoleGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Role>> {
    const group = await this.fusio.getClient().getBackendRoleByRoleId(id);
    return await group.backendActionRoleGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/role';
  }

}
