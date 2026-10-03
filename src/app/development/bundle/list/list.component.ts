import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendBundle} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {BundleService} from "../../../services/bundle.service";
import {ListButtons} from "../../../shared/list-buttons/list-buttons";

@Component({
  selector: 'app-bundle-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    ListButtons
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendBundle> {

  constructor(private service: BundleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): BundleService {
    return this.service;
  }

}
