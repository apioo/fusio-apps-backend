import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendTransaction, BackendTransactionCollection, Client} from "fusio-sdk";
import {PlanService} from "../../../services/plan.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TransactionService} from "../../../services/transaction.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
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
