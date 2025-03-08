import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendLogError} from "fusio-sdk";
import {LogErrorService} from "../../../services/log-error.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-error-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendLogError> {

  constructor(private service: LogErrorService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogErrorService {
    return this.service;
  }

}
