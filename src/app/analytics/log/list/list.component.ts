import {Component, computed, signal} from '@angular/core';
import {ErrorService, List, MessageComponent, SearchComponent} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../../services/log.service";
import {NgbModal, NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  imports: [
    MessageComponent,
    SearchComponent,
    NgbPagination
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendLog> {

  filter = signal<Filter>({
    from: undefined,
    to: undefined,
    operationId: undefined,
    appId: undefined,
    userId: undefined,
    ip: undefined,
    userAgent: undefined,
    method: undefined,
    path: undefined,
    header: undefined,
    body: undefined,
  });

  override collectionQuery = computed<Array<any>>(() => {
    let query: Array<any> = [];
    query.push((this.page() - 1) * this.pageSize());
    query.push(this.pageSize());
    const search = this.search();
    if (search) {
      query.push(search);
    } else {
      query.push('');
    }

    for (const [key, value] of Object.entries(this.filter())) {
      if (value !== undefined && value !== null) {
        query.push(value);
      } else {
        query.push('');
      }
    }

    return query;
  });

  constructor(private service: LogService, private modalService: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.service;
  }

  openFilterDialog() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter();
    modalRef.closed.subscribe(async (filter: Filter) => {
      this.filter.set(filter);
      await this.doList();
    });
  }

}

export interface Filter {
  from?: string
  to?: string
  operationId?: number
  appId?: number
  userId?: number
  ip?: string
  userAgent?: string
  method?: string
  path?: string
  header?: string
  body?: string
}
