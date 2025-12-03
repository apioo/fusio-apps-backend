import {Component} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {MarketplaceBundle} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {BundleService} from "../../../../services/marketplace/bundle.service";

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
export class ListComponent extends List<MarketplaceBundle> {

  constructor(private service: BundleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): BundleService {
    return this.service;
  }

}
