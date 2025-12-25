import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendIdentity} from "fusio-sdk";
import {IdentityService} from "../../../services/identity.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-identity-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination
  ],
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
