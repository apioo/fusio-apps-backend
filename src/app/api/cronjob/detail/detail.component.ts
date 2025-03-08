import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {CronjobService} from "../../../services/cronjob.service";

@Component({
  selector: 'app-cronjob-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

}
