import {Component, OnInit, signal} from '@angular/core';
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

  response = signal<CommonMessage|undefined>(undefined);

  apps = signal<Array<MarketplaceApp>>([]);
  appTotalResults = signal<number>(0);
  appPage = signal<number>(1);
  appPageSize = signal<number>(16);
  appSearch = signal<string|undefined>('');

  actions = signal<Array<MarketplaceAction>>([]);
  actionTotalResults = signal<number>(0);
  actionPage = signal<number>(1);
  actionPageSize = signal<number>(16);
  actionSearch = signal<string|undefined>('');

  selectedType = signal<'action'|'app'>('action');

  constructor(private fusio: ApiService, private route: ActivatedRoute, private router: Router, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.selectType(params['type'] || 'action');
    });
  }

  selectType(type?: string) {
    if (type === 'action') {
      this.selectedType.set('action');
    } else {
      this.selectedType.set('app');
    }

    this.load();
  }

  changeTab() {
    this.router.navigate(['/marketplace/', this.selectedType()]);
  }

  doPageChange() {
    this.load();
  }

  doSearch(search?: string) {
    if (this.selectedType() === 'action') {
      this.actionSearch.set(search);
    } else {
      this.appSearch.set(search);
    }
    this.load();
  }

  async load(): Promise<void> {
    try {
      if (this.selectedType() === 'action') {
        const response = await this.fusio.getClient().backend().marketplace().action().getAll(...this.getActionCollectionQuery())
        this.actions.set(response.entry || []);
        this.actionTotalResults.set(response.totalResults || 0);
      } else {
        const response = await this.fusio.getClient().backend().marketplace().app().getAll(...this.getAppCollectionQuery())
        this.apps.set(response.entry || []);
        this.appTotalResults.set(response.totalResults || 0);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  private getActionCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.actionPage() - 1) * this.actionPageSize());
    query.push(this.actionSearch() || '');

    return query;
  }

  private getAppCollectionQuery(): Array<any> {
    let query: Array<any> = [];
    query.push((this.appPage() - 1) * this.appPageSize());
    query.push(this.appSearch() || '');

    return query;
  }
}
