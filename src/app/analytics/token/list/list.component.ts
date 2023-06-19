import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";
import {AppToken} from "fusio-sdk/dist/src/generated/backend/AppToken";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, AppToken> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<Collection<AppToken>> {
    return this.fusio.getClient().app().getAllTokens(...parameters);
  }

  protected async get(id: string): Promise<AppToken> {
    return this.fusio.getClient().app().getToken(id);
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
