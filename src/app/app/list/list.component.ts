import {Component} from '@angular/core';
import {List} from "../../list";
import {App} from "fusio-sdk/src/generated/backend/App";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<App> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<App>>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendApp().backendActionAppGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppByAppId(id).backendActionAppGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/app';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
