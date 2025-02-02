import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendRate, BackendRateCollection, Client} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rate-list',
  templateUrl: './list.component.html',
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
