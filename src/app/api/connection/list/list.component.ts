import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {LinkService} from "../../../services/connection/link.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ListButtons} from "../../../shared/list-buttons/list-buttons";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    ListButtons
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

  getDesignerLink(connection: BackendConnection): Array<string> {
    if (!this.link.hasDesignerLink(connection)) {
      return [];
    }

    return this.link.getDesignerLink(connection);
  }

}
