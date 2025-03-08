import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {CronjobService} from "../../../services/cronjob.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

}
