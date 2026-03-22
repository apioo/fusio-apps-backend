import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {CronjobService} from "../../../services/cronjob.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {Mover, TaxonomyType} from "../../../services/taxonomy/mover.service";
import {TaxonomyList} from "../../../abstract/taxonomy-list";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {NgClass} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  imports: [
    NgbPagination,
    ActionLinkComponent,
    MessageComponent,
    SearchComponent,
    Taxonomy,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends TaxonomyList<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

  getTaxonomyType(): TaxonomyType {
    return 'cronjobs';
  }

}
