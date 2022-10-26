import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";
import {AppToken} from "fusio-sdk/dist/src/generated/backend/AppToken";
import {AppTokenCollectionQuery} from "fusio-sdk/dist/src/generated/backend/AppTokenCollectionQuery";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, AppToken> {

  filter: AppTokenCollectionQuery = {};

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<AppToken>>> {
    const resource = await this.fusio.getClient().getBackendAppToken();
    return await resource.backendActionAppTokenGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<AppToken>> {
    const resource = await this.fusio.getClient().getBackendAppTokenByTokenId(id);
    return await resource.backendActionAppTokenGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/token';
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

  protected override getCollectionQuery(): AppTokenCollectionQuery {
    let query: AppTokenCollectionQuery = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
