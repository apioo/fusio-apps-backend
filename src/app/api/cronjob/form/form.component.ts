import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CronjobService} from "../../../services/cronjob.service";
import {ActionService} from "../../../services/action.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ActionSelectorComponent} from "../../../shared/action-selector/action-selector.component";

@Component({
    selector: 'app-cronjob-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    ActionSelectorComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendCronjob> {

  constructor(private service: CronjobService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
