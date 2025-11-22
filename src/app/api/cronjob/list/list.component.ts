import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {CronjobService} from "../../../services/cronjob.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  imports: [
    NgbPagination,
    RouterLink,
    ActionLinkComponent,
    MessageComponent,
    SearchComponent
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

}
