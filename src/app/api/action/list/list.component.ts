import {Component} from '@angular/core';
import {ErrorService, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendAction} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyType} from "../../../services/taxonomy/mover.service";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListButtons} from "../../../shared/list-buttons/list-buttons";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination,
    Taxonomy,
    NgClass,
    ReactiveFormsModule,
    FormsModule,
    ListButtons
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
