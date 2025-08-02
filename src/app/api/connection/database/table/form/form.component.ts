import {Component, OnInit} from '@angular/core';
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {ErrorService, Form} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";

@Component({
  selector: 'app-connection-database-table-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendDatabaseTable> implements OnInit {

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
