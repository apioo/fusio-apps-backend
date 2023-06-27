import {Component} from '@angular/core';
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Transaction} from "fusio-sdk/dist/src/generated/backend/Transaction";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Transaction> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Transaction>> {
    return this.fusio.getClient().transaction().getAll(...parameters);
  }

  protected async get(id: string): Promise<Category> {
    return this.fusio.getClient().transaction().get(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/transaction';
  }

}
