import {Component, OnInit} from '@angular/core';
import {BackendDatabaseTable} from "fusio-sdk";
import {ErrorService, Form} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TableService} from "../../../../services/database/table.service";

@Component({
  selector: 'app-database-table-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendDatabaseTable> implements OnInit {

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
