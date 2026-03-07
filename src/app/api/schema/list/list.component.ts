import {Component} from '@angular/core';
import {ErrorService, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {SchemaService} from "../../../services/schema.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyType} from "../../../services/taxonomy/mover.service";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    Taxonomy,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends TaxonomyList<BackendSchema> {

  constructor(private service: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  getTaxonomyType(): TaxonomyType {
    return 'schemas';
  }

}
