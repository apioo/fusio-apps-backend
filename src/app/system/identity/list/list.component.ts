import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendIdentity, BackendIdentityCollection, Client} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {IdentityService} from "../../../services/identity.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-identity-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendIdentity> {

  constructor(private service: IdentityService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): IdentityService {
    return this.service;
  }

}
