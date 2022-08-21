import {Component} from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Category> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Category>>> {
    const group = await this.fusio.getClient().backendCategory();
    return await group.getBackendCategory().backendActionCategoryGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const group = await this.fusio.getClient().backendCategory();
    return await group.getBackendCategoryByCategoryId(id).backendActionCategoryGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/category';
  }

}
