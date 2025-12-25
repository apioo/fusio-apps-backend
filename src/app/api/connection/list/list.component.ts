import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {LinkService} from "../../../services/connection/link.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendConnection> {

  constructor(private service: ConnectionService, private link: LinkService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

  hasDesignerLink(connection: BackendConnection): boolean {
    return this.link.hasDesignerLink(connection);
  }

  getDesignerLink(connection: BackendConnection): Array<string> {
    return this.link.getDesignerLink(connection);
  }

}
