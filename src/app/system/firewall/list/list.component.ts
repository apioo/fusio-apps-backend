import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendFirewall} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FirewallService} from "../../../services/firewall.service";
import {DatePipe} from "@angular/common";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-firewall-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    DatePipe,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendFirewall> {

  constructor(private service: FirewallService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FirewallService {
    return this.service;
  }

}
