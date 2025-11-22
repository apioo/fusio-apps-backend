import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendApp} from "fusio-sdk";
import {AppService} from "../../../services/app.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {ScopeCategoriesComponent} from "../../../shared/scope-categories/scope-categories.component";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-app-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    ScopeCategoriesComponent,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendApp> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Pending'
  }, {
    key: 3,
    value: 'Deactivated'
  }];

  constructor(private service: AppService, private help: HelpService, public user: UserService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
