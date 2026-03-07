import {Component} from '@angular/core';
import {ErrorService, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk";
import {EventService} from "../../../services/event.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyType} from "../../../services/taxonomy/mover.service";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-event-list',
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
export class ListComponent extends TaxonomyList<BackendEvent> {

  constructor(private service: EventService, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): EventService {
    return this.service;
  }

  getTaxonomyType(): TaxonomyType {
    return 'events';
  }

}
