import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendDatabaseRow, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {RowService} from "../../../../services/database/row.service";
import {TableService} from "../../../../services/database/table.service";

@Component({
  selector: 'app-database-row-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendDatabaseRow> {

  selectedConnection?: string;
  table?: BackendDatabaseTable;

  constructor(private service: RowService, private tableService: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RowService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = params['connection'];
        this.service.setConnection(params['connection']);
      }
      if (params['table']) {
        this.table = await this.tableService.get(params['table']);
        this.service.setTable(this.table);
      }
    });

    super.ngOnInit();
  }

  get primaryKey(): string {
    return this.table?.primaryKey || '';
  }

}
