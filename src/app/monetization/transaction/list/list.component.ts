import { Component, OnInit } from '@angular/core';
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {List} from "../../../list";
import {Transaction} from "fusio-sdk/dist/src/generated/backend/Transaction";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Transaction> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Transaction>>> {
    const group = await this.factory.getClient().backendTransaction();
    return await group.getBackendTransaction().backendActionTransactionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const group = await this.factory.getClient().backendTransaction();
    return await group.getBackendTransactionByTransactionId(id).backendActionTransactionGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/transaction';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
