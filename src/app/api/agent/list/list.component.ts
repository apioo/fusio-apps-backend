import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendAgent} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {AgentService} from "../../../services/agent.service";
import {ListButtons} from "../../../shared/list-buttons/list-buttons";

@Component({
  selector: 'app-agent-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    ListButtons
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendAgent> {

  constructor(private service: AgentService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AgentService {
    return this.service;
  }

}
