import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {LogService} from "../../../services/log.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-log-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendLog> {

  constructor(private service: LogService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.service;
  }

}
