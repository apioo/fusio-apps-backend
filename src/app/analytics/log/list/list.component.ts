import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../../services/log.service";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendLog> {

  filter: any = {};

  constructor(private service: LogService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.service;
  }

}
