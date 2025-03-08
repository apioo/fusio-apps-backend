import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendConfig} from "fusio-sdk";
import {ConfigService} from "../../../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendConfig> {

  constructor(private service: ConfigService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConfigService {
    return this.service;
  }

}
