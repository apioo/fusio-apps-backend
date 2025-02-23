import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendDatabaseTable} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../services/database/table.service";

@Component({
  selector: 'app-database-table-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendDatabaseTable> {

  constructor(private service: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TableService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.service.setConnection(params['connection']);
      }
    });
  }

}
