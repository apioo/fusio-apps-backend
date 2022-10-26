import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Page> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Page>>> {
    const resource = await this.fusio.getClient().getBackendPage();
    return await resource.backendActionPageGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Page>> {
    const resource = await this.fusio.getClient().getBackendPageByPageId(id);
    return await resource.backendActionPageGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/page';
  }

}
