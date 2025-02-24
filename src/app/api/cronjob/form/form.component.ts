import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {CronjobService} from "../../../services/cronjob.service";
import {ActionService} from "../../../services/action.service";

@Component({
  selector: 'app-cronjob-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

}
