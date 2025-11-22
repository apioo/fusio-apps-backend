import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";
import {EventService} from "../../../services/event.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ActionSelectorComponent} from "../../../shared/action-selector/action-selector.component";

@Component({
    selector: 'app-trigger-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent,
    ActionSelectorComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTrigger> {

  constructor(private service: TriggerService, private help: HelpService, public event: EventService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
