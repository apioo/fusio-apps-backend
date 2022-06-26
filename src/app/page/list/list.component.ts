import {Component} from '@angular/core';
import {List} from "../../list";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Page> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Page>>> {
    const group = await this.factory.getClient().backendPage();
    return await group.getBackendPage().backendActionPageGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Page>> {
    const group = await this.factory.getClient().backendPage();
    return await group.getBackendPageByPageId(id).backendActionPageGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/page';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
