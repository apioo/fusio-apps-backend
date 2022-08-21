import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Audit} from "fusio-sdk/dist/src/generated/backend/Audit";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Audit_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Audit_Collection_Query";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Audit> {

  filter: Audit_Collection_Query = {};

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Audit>>> {
    const group = await this.fusio.getClient().backendAudit();
    return await group.getBackendAudit().backendActionAuditGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Audit>> {
    const group = await this.fusio.getClient().backendAudit();
    return await group.getBackendAuditByAuditId(id).backendActionAuditGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/audit';
  }

  override openCreateDialog() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter;
    modalRef.closed.subscribe(async (filter) => {
      this.filter = filter;
      await this.doList();
    });
  }

  protected override getCollectionQuery(): Audit_Collection_Query {
    let query: Audit_Collection_Query = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
