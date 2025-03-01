import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendWebhook} from "fusio-sdk";
import {RoleService} from "../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebhookService} from "../../../services/webhook.service";
import {UserService} from "../../../services/user.service";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-webhook-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendWebhook> {

  constructor(private service: WebhookService, public event: EventService, public user: UserService, public role: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.service;
  }

}
