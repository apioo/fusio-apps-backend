import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, User> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<User>>> {
    const resource = await this.fusio.getClient().getBackendUser();
    return await resource.backendActionUserGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<User>> {
    const resource = await this.fusio.getClient().getBackendUserByUserId(id);
    return await resource.backendActionUserGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/user';
  }

}
