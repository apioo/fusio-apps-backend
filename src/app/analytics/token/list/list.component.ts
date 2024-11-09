import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendToken, BackendTokenCollection, Client} from "fusio-sdk";
import {FilterComponent} from "../filter/filter.component";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendToken> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<BackendTokenCollection> {
    return this.fusio.getClient().backend().token().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendToken> {
    return this.fusio.getClient().backend().token().get(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/token';
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
