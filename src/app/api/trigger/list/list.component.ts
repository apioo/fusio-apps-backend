import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";

@Component({
  selector: 'app-trigger-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendTrigger> {

  constructor(private service: TriggerService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

}
