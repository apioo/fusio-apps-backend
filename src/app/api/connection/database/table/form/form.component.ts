import {Component, OnInit, signal} from '@angular/core';
import {BackendConnection, BackendDatabaseTable} from "fusio-sdk";
import {ErrorService, Form, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TableService} from "../../../../../services/connection/database/table.service";
import {ConnectionService} from "../../../../../services/connection.service";
import {FormBreadcrump} from "../../../../../shared/form-breadcrump/form-breadcrump";
import {FormsModule} from "@angular/forms";
import {ColumnComponent} from "../column/column.component";
import {IndexComponent} from "../index/index.component";
import {ForeignKeyComponent} from "../foreign-key/foreign-key.component";
import {FormButtons} from "../../../../../shared/form-buttons/form-buttons";

@Component({
  selector: 'app-connection-database-table-form',
  templateUrl: './form.component.html',
  imports: [
    RouterLink,
    FormBreadcrump,
    MessageComponent,
    FormsModule,
    ColumnComponent,
    IndexComponent,
    ForeignKeyComponent,
    FormButtons
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendDatabaseTable> implements OnInit {

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
