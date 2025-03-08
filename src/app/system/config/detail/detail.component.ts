import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendConfig} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-config-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConfig> {

  constructor(private service: ConfigService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConfigService {
    return this.service;
  }

}
