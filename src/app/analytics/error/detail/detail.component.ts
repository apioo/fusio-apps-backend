import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendLogError} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {LogErrorService} from "../../../services/log-error.service";

@Component({
  selector: 'app-error-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendLogError> {

  constructor(private service: LogErrorService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogErrorService {
    return this.service;
  }

}
