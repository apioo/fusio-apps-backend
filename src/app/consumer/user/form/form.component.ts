import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendRole, BackendUserCreate} from "fusio-sdk";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './form.component.html',
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

  constructor(private service: UserService, public role: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): UserService {
    return this.service;
  }

}
