import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {SchemaService} from "../../../services/schema.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendSchema> {

  constructor(private service: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

}
