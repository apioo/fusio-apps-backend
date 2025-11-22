import {Component, OnInit} from '@angular/core';
import {ErrorService, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {CommonMessage, MarketplaceAction, MarketplaceApp} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../api.service";
import {
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLinkBase,
  NgbNavOutlet,
  NgbPagination
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-marketplace-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    NgbNav,
    NgbNavItem,
    NgbNavLinkBase,
    NgbNavContent,
    SearchComponent,
    RouterLink,
    NgbPagination,
    NgbNavOutlet
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  response?: CommonMessage;

  apps?: Array<MarketplaceApp>;
  appTotalResults: number = 0;
  appPage: number = 1;
  appPageSize: number = 16;
  appSearch?: string;

  actions?: Array<MarketplaceAction>;
  actionTotalResults: number = 0;
  actionPage: number = 1;
  actionPageSize: number = 16;
  actionSearch?: string;

  selectedType: 'action'|'app' = 'action';

  constructor(private fusio: ApiService, private route: ActivatedRoute, private router: Router, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.selectType(params['type'] || 'action');
    });
  }

  selectType(type?: string) {
    if (type === 'action') {
      this.selectedType = 'action';
    } else {
      this.selectedType = 'app';
    }

    this.load();
  }

  changeTab() {
    this.router.navigate(['/marketplace/', this.selectedType]);
  }

  doPageChange(page?: number) {
    this.load();
  }

  doSearch(search?: string) {
    if (this.selectedType === 'action') {
      this.actionSearch = search;
    } else {
      this.appSearch = search;
    }
    this.load();
  }

  async load(): Promise<void> {
    try {
      if (this.selectedType === 'action') {
        const response = await this.fusio.getClient().backend().marketplace().action().getAll(...this.getActionCollectionQuery())
        this.actions = response.entry || [];
        this.actionTotalResults = response.totalResults || 0;
      } else {
        const response = await this.fusio.getClient().backend().marketplace().app().getAll(...this.getAppCollectionQuery())
        this.apps = response.entry || [];
        this.appTotalResults = response.totalResults || 0;
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  private getActionCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.actionPage - 1) * this.actionPageSize);
    query.push(this.actionSearch || '');

    return query;
  }

  private getAppCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.appPage - 1) * this.appPageSize);
    query.push(this.appSearch || '');

    return query;
  }
}
