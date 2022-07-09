import { Component, OnInit } from '@angular/core';
import {List} from "../../../list";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Config> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Category>>> {
    const group = await this.factory.getClient().backendConfig();
    return await group.getBackendConfig().backendActionConfigGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const group = await this.factory.getClient().backendConfig();
    return await group.getBackendConfigByConfigId(id).backendActionConfigGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/config';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
