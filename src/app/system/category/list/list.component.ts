import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Category> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Category>>> {
    const resource = await this.fusio.getClient().getBackendCategory();
    return await resource.backendActionCategoryGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const resource = await this.fusio.getClient().getBackendCategoryByCategoryId(id);
    return await resource.backendActionCategoryGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/category';
  }

}
