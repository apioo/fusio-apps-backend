import {Component, inject, signal} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendAction} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {Mover, TaxonomyType} from "../../../services/taxonomy/mover.service";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {TreeBuilder} from "../../../services/taxonomy/tree-builder.service";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    RouterLink,
    NgbPagination,
    Taxonomy,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends TaxonomyList<BackendAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  getTaxonomyType(): TaxonomyType {
    return 'actions';
  }

}
