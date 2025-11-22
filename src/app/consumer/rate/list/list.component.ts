import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendRate, BackendRateCollection, Client} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rate-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendRate> {

  constructor(private service: RateService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RateService {
    return this.service;
  }

}
