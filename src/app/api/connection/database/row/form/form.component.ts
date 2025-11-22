import {Component} from '@angular/core';
import {ErrorService, Form, MessageComponent} from "ngx-fusio-sdk";
import {BackendConnection, BackendDatabaseRow, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RowService} from "../../../../../services/connection/database/row.service";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";
import {FormBreadcrump} from "../../../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-connection-database-row-form',
  templateUrl: './form.component.html',
  imports: [
    RouterLink,
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendDatabaseRow> {

  selectedConnection?: BackendConnection;
  table?: BackendDatabaseTable;

  constructor(private service: RowService, private connection: ConnectionService, private tableService: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RowService {
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
      if (params['table']) {
        this.table = await this.tableService.get(params['table']);
        this.service.setTable(this.table);
      }

      if (this.service.isConfigured()) {
        await super.ngOnInit();
      }
    });
  }

  get primaryKey(): string {
    return this.table?.primaryKey || '';
  }

}
