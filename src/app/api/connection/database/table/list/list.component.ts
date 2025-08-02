import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";

@Component({
  selector: 'app-connection-database-table-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendDatabaseTable> {

  selectedConnection?: BackendConnection;

  constructor(private service: TableService, private connection: ConnectionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TableService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = await this.connection.get(params['connection']);
        if (this.selectedConnection) {
          this.service.setConnection(this.selectedConnection);
        }
      }

      if (this.service.isConfigured()) {
        await super.ngOnInit();
      }
    });
  }

}
