import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {BackendDatabaseTable} from "fusio-sdk";
import {TableService} from "../../../../services/database/table.service";

@Component({
  selector: 'app-database-table-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendDatabaseTable> {

  selectedConnection?: string;

  constructor(private service: TableService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TableService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = params['connection'];
        this.service.setConnection(params['connection']);
      }
    });

    super.ngOnInit();
  }

}
