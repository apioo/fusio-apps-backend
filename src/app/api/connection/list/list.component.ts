import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendConnection> {

  constructor(private service: ConnectionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

}
