import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {FilterComponent} from "../filter/filter.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendAudit} from "fusio-sdk/dist/BackendAudit";
import {BackendAuditCollection} from "fusio-sdk/dist/BackendAuditCollection";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendAudit> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<BackendAuditCollection> {
    return this.fusio.getClient().backend().audit().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendAudit> {
    return this.fusio.getClient().backend().audit().get(id);
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

  protected override getCollectionQuery(): Array<any> {
    let query = super.getCollectionQuery();

    if (this.filter) {
      query.push(this.filter);
    }

    return query;
  }

}
