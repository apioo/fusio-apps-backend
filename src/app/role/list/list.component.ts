import {Component} from '@angular/core';
import {List} from "../../list";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Role> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Role>>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRole().backendActionRoleGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Role>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRoleByRoleId(id).backendActionRoleGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/role';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
