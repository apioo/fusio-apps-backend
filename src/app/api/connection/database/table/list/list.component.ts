import {Component, signal} from '@angular/core';
import {ErrorService, List, SearchComponent} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-connection-database-table-list',
  templateUrl: './list.component.html',
  imports: [
    RouterLink,
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendDatabaseTable> {

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  constructor(private service: TableService, private connection: ConnectionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TableService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        try {
          const connection = await this.connection.get(params['connection']);
          if (connection) {
            this.service.setConnection(connection);
            this.selectedConnection.set(connection);
          }
        } catch (error) {
          this.response.set(this.error.convert(error));
        }
      }
    });
  }

}
