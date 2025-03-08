import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendConfig} from "fusio-sdk";
import {ConfigService} from "../../../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-config-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendConfig> {

  constructor(private service: ConfigService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConfigService {
    return this.service;
  }

}
