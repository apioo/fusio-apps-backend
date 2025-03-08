import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {LogService} from "../../../services/log.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendLog> {

  filter: Filter = {
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
  };

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
    modalRef.componentInstance.filter = this.filter;
    modalRef.closed.subscribe(async (filter: Filter) => {
      this.filter = filter;
      await this.doList();
    });
  }

  protected override getCollectionQuery(): Array<any> {
    let query = super.getCollectionQuery();

    for (const [key, value] of Object.entries(this.filter)) {
      if (value !== undefined && value !== null) {
        query.push(value);
      } else {
        query.push('');
      }
    }

    return query;
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
