import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Page> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Page>>> {
    const group = await this.fusio.getClient().backendPage();
    return await group.getBackendPage().backendActionPageGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Page>> {
    const group = await this.fusio.getClient().backendPage();
    return await group.getBackendPageByPageId(id).backendActionPageGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/page';
  }

}
