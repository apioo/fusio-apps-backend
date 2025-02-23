import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendWebhook} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {WebhookService} from "../../../services/webhook.service";

@Component({
  selector: 'app-webhook-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendWebhook> {

  constructor(private service: WebhookService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.service;
  }

}
