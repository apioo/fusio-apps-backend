import {Component} from '@angular/core';
import {List} from "../../../list";
import {App_Token} from "fusio-sdk/dist/src/generated/backend/App_Token";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {App_Token_Collection_Query} from "fusio-sdk/dist/src/generated/backend/App_Token_Collection_Query";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<App_Token> {

  filter: App_Token_Collection_Query = {};

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<App_Token>>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppToken().backendActionAppTokenGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App_Token>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppTokenByTokenId(id).backendActionAppTokenGet();
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

  protected override getCollectionQuery(): App_Token_Collection_Query {
    let query: App_Token_Collection_Query = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
