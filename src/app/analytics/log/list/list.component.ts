import {Component} from '@angular/core';
import {FilterComponent} from "../filter/filter.component";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendLog} from "fusio-sdk/dist/BackendLog";
import {BackendLogCollection} from "fusio-sdk/dist/BackendLogCollection";

@Component({
  selector: 'app-log-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendLog> {

  filter: any = {};

  protected async getAll(parameters: Array<any>): Promise<BackendLogCollection> {
    return this.fusio.getClient().backend().log().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendLog> {
    return this.fusio.getClient().backend().log().get(id);
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
