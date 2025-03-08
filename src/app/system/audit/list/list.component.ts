import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendAudit} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {AuditService} from "../../../services/audit.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendAudit> {

  filter: Filter = {
    from: undefined,
    to: undefined,
    appId: undefined,
    userId: undefined,
    event: undefined,
    ip: undefined,
    message: undefined,
  };

  constructor(private service: AuditService, private modalService: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AuditService {
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
  appId?: number
  userId?: number
  event?: string
  ip?: string
  message?: string
}
