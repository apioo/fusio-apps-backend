import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendTransaction} from "fusio-sdk";
import {TransactionService} from "../../../services/transaction.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTransaction> {

  constructor(private service: TransactionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TransactionService {
    return this.service;
  }

}
