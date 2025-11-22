import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendRole, BackendUserCreate} from "fusio-sdk";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ScopeCategoriesComponent} from "../../../shared/scope-categories/scope-categories.component";

@Component({
    selector: 'app-user-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent,
    ScopeCategoriesComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendUserCreate> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Disabled'
  }];

  constructor(private service: UserService, private help: HelpService, public role: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): UserService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
