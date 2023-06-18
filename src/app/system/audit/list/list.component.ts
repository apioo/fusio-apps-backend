import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Audit} from "fusio-sdk/dist/src/generated/backend/Audit";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-audit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Audit> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<Collection<Audit>> {
    return this.fusio.getClient().audit().getAll(...parameters);
  }

  protected async get(id: string): Promise<Audit> {
    return this.fusio.getClient().audit().get(id);
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
