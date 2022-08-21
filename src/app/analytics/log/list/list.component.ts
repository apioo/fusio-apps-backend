import {Component} from '@angular/core';
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Log_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Log_Collection_Query";
import {FilterComponent} from "../filter/filter.component";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Log> {

  filter: Log_Collection_Query = {};

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Log>>> {
    const group = await this.fusio.getClient().backendLog();
    return await group.getBackendLog().backendActionLogGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Log>> {
    const group = await this.fusio.getClient().backendLog();
    return await group.getBackendLogByLogId(id).backendActionLogGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/log';
  }

  override openCreateDialog() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter;
    modalRef.closed.subscribe(async (filter) => {
      this.filter = filter;
      await this.doList();
    });
  }

  protected override getCollectionQuery(): Log_Collection_Query {
    let query: Log_Collection_Query = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
