import {Component} from '@angular/core';
import {List} from "../../../list";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<User> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<User>>> {
    const group = await this.factory.getClient().backendUser();
    return await group.getBackendUser().backendActionUserGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<User>> {
    const group = await this.factory.getClient().backendUser();
    return await group.getBackendUserByUserId(id).backendActionUserGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/user';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
