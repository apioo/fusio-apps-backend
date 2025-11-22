import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendPlan} from "fusio-sdk";
import {PlanService} from "../../../services/plan.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScopeCategoriesComponent} from "../../../shared/scope-categories/scope-categories.component";

@Component({
    selector: 'app-plan-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    ScopeCategoriesComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendPlan> {

  periods = [{
    id: 0,
    name: 'One-Time'
  }, {
    id: 1,
    name: 'Subscription'
  }];

  constructor(private service: PlanService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PlanService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
