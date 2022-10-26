import {Component} from '@angular/core';
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {LogCollectionQuery} from "fusio-sdk/dist/src/generated/backend/LogCollectionQuery";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Log> {

  filter: LogCollectionQuery = {};

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Log>>> {
    const resource = await this.fusio.getClient().getBackendLog();
    return await resource.backendActionLogGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Log>> {
    const resource = await this.fusio.getClient().getBackendLogByLogId(id);
    return await resource.backendActionLogGet();
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

  protected override getCollectionQuery(): LogCollectionQuery {
    let query: LogCollectionQuery = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
