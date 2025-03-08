import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendApp} from "fusio-sdk";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendApp> {

  constructor(private service: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.service;
  }

}
