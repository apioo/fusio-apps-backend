import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendDatabaseRow, BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {RowService} from "../../../../services/database/row.service";
import {TableService} from "../../../../services/database/table.service";

@Component({
  selector: 'app-database-row-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendDatabaseRow> {

  id: string|null = null;
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
        this.tableService.setConnection(params['connection']);
      }
      if (params['table']) {
        this.table = await this.tableService.get(params['table']);
        this.service.setTable(this.table);

        if (this.id) {
          await this.doGet(this.id);
        }
      }
    });

    this.route.paramMap.subscribe(async params => {
      this.id = params.get('id');
    });
  }

  get primaryKey(): string {
    return this.table?.primaryKey || '';
  }

  get keyValues(): Array<KeyValue> {
    if (!this.selected) {
      return [];
    }

    const result = [];
    for (const [key, value] of Object.entries(this.selected)) {
      result.push({
        key: key,
        value: value,
      })
    }

    return result;
  }

}

interface KeyValue {
  key: string
  value: string
}
