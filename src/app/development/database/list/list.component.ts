import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {BackendConnection} from "fusio-sdk";

@Component({
  selector: 'app-database-list',
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

  protected override getCollectionQuery(): Array<any> {
    let query = super.getCollectionQuery();
    if (!this.search) {
      query.push('');
    }
    query.push('Fusio.Adapter.Sql.Connection.Sql,Fusio.Adapter.Sql.Connection.SqlAdvanced,Fusio.Impl.Connection.System');
    return query;
  }

}
