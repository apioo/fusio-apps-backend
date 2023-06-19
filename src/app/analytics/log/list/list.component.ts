import {Component} from '@angular/core';
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {FilterComponent} from "../filter/filter.component";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Log> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<Collection<Log>> {
    return this.fusio.getClient().log().getAll(...parameters);
  }

  protected async get(id: string): Promise<Log> {
    return this.fusio.getClient().log().get(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/log';
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
