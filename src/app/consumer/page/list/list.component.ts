import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendPage} from "fusio-sdk";
import {PageService} from "../../../services/page.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendPage> {

  constructor(private service: PageService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PageService {
    return this.service;
  }

}
