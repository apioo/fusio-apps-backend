import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {FilterComponent} from "../filter/filter.component";
import {BackendAppToken, BackendAppTokenCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendAppToken> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<BackendAppTokenCollection> {
    return this.fusio.getClient().backend().app().getAllTokens(...parameters);
  }

  protected async get(id: string): Promise<BackendAppToken> {
    return this.fusio.getClient().backend().app().getToken(id);
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
