import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {TaxonomyType} from "../../../services/taxonomy/mover.service";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-trigger-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    ActionLinkComponent,
    NgbPagination,
    Taxonomy,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends TaxonomyList<BackendTrigger> {

  constructor(private service: TriggerService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

  getTaxonomyType(): TaxonomyType {
    return 'triggers';
  }

}
