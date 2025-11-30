import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {MarketplaceAction} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {ActionService} from "../../../../services/marketplace/action.service";

@Component({
  selector: 'app-marketplace-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    RouterLink,
    NgbPagination,
    SearchComponent
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<MarketplaceAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

}
