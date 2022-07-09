import { Component, OnInit } from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "../../../list";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Category> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Category>>> {
    const group = await this.factory.getClient().backendCategory();
    return await group.getBackendCategory().backendActionCategoryGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const group = await this.factory.getClient().backendCategory();
    return await group.getBackendCategoryByCategoryId(id).backendActionCategoryGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/category';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
