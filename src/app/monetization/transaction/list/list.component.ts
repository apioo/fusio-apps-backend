import {Component} from '@angular/core';
import {ErrorService, List, SearchComponent} from "ngx-fusio-sdk";
import {BackendTransaction} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../../services/transaction.service";
import {CurrencyPipe} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  imports: [
    SearchComponent,
    CurrencyPipe,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendTransaction> {

  constructor(private service: TransactionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TransactionService {
    return this.service;
  }

}
