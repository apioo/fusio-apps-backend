import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendRate} from "fusio-sdk";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendRate> {

  constructor(private service: RateService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RateService {
    return this.service;
  }

}
