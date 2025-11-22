import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendScope, BackendScopeCollection, Client} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {ScopeService} from "../../../services/scope.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendScope> {

  constructor(private service: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ScopeService {
    return this.service;
  }

}
