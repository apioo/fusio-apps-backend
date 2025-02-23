import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendRole} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-role-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendRole> {

  constructor(private service: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RoleService {
    return this.service;
  }

}
