import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendWebhook} from "fusio-sdk";
import {RoleService} from "../../../services/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebhookService} from "../../../services/webhook.service";
import {UserService} from "../../../services/user.service";
import {EventService} from "../../../services/event.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-webhook-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendWebhook> {

  constructor(private service: WebhookService, private help: HelpService, public event: EventService, public user: UserService, public role: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): WebhookService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
