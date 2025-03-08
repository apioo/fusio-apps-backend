import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendPlan} from "fusio-sdk";
import {PlanService} from "../../../services/plan.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendPlan> {

  constructor(private service: PlanService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PlanService {
    return this.service;
  }

}
