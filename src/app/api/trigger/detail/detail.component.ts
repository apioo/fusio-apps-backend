import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";

@Component({
  selector: 'app-trigger-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTrigger> {

  constructor(private service: TriggerService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

}
