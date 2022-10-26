import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Transaction} from "fusio-sdk/dist/src/generated/backend/Transaction";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Transaction> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Transaction>>> {
    const resource = await this.fusio.getClient().getBackendTransaction();
    return await resource.backendActionTransactionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const resource = await this.fusio.getClient().getBackendTransactionByTransactionId(id);
    return await resource.backendActionTransactionGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/transaction';
  }

}
