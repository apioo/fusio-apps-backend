import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendScope, BackendScopeCollection, Client} from "fusio-sdk";
import {FormComponent} from "../form/form.component";
import {ScopeService} from "../../../services/scope.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
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
