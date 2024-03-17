import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendTransaction, BackendTransactionCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendTransaction> {

  protected async getAll(parameters: Array<any>): Promise<BackendTransactionCollection> {
    return this.fusio.getClient().backend().transaction().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendTransaction> {
    return this.fusio.getClient().backend().transaction().get(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/transaction';
  }

}
