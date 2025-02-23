import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendPlan} from "fusio-sdk";
import {WebhookService} from "../../../services/webhook.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../../services/plan.service";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendPlan> {

  constructor(private service: PlanService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PlanService {
    return this.service;
  }

}
