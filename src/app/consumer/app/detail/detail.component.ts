import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendApp} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendApp> {

  constructor(private service: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.service;
  }

}
