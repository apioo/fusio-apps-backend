import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";

@Component({
  selector: 'app-connection-database-table-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendDatabaseTable> {

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
