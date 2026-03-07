import {Component, signal} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendOperation} from "fusio-sdk";
import {OperationService} from "../../../services/operation.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {OperationStatus} from "../../../shared/operation-status/operation-status";
import {Taxonomy} from "../../../shared/taxonomy/taxonomy";
import {FormsModule} from "@angular/forms";
import {Mover, TaxonomyType} from "../../../services/taxonomy/mover.service";
import {TreeBuilder} from "../../../services/taxonomy/tree-builder.service";
import {NgClass} from "@angular/common";
import {TaxonomyList} from "../../../abstract/taxonomy-list";

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    ActionLinkComponent,
    NgbPagination,
    OperationStatus,
    Taxonomy,
    FormsModule,
    NgClass
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends TaxonomyList<BackendOperation> {

  baseUrl: string = '';

  constructor(private service: OperationService, private fusio: ApiService, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): OperationService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.baseUrl = this.fusio.getBaseUrl();
  }

  getTaxonomyType(): TaxonomyType {
    return 'operations';
  }

}
