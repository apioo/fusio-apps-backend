import { Component, OnInit } from '@angular/core';
import {Log} from "fusio-sdk/src/generated/backend/Log";
import {List} from "../../list";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/src/generated/backend/Collection";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Log> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Log>>> {
    const group = await this.factory.getClient().backendLog();
    return await group.getBackendLog().backendActionLogGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Log>> {
    const group = await this.factory.getClient().backendLog();
    return await group.getBackendLogByLogId(id).backendActionLogGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/log';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
