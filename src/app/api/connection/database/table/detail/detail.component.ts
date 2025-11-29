import {Component, signal} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-connection-database-table-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendDatabaseTable> {

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
