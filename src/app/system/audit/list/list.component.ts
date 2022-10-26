import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Audit} from "fusio-sdk/dist/src/generated/backend/Audit";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";
import {AuditCollectionQuery} from "fusio-sdk/dist/src/generated/backend/AuditCollectionQuery";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Audit> {

  filter: AuditCollectionQuery = {};

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Audit>>> {
    const resource = await this.fusio.getClient().getBackendAudit();
    return await resource.backendActionAuditGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Audit>> {
    const resource = await this.fusio.getClient().getBackendAuditByAuditId(id);
    return await resource.backendActionAuditGet();
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

  protected override getCollectionQuery(): AuditCollectionQuery {
    let query: AuditCollectionQuery = {};
    query = Object.assign(query, super.getCollectionQuery());

    if (this.filter) {
      query = Object.assign(query, this.filter);
    }

    return query;
  }

}
