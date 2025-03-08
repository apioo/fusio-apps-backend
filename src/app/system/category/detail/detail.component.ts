import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendCategory} from "fusio-sdk";
import {TransactionService} from "../../../services/transaction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendCategory> {

  constructor(private service: CategoryService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CategoryService {
    return this.service;
  }

}
