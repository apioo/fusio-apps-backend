import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendCategory} from "fusio-sdk/dist/BackendCategory";
import {BackendCategoryCollection} from "fusio-sdk/dist/BackendCategoryCollection";

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendCategory> {

  protected async getAll(parameters: Array<any>): Promise<BackendCategoryCollection> {
    return this.fusio.getClient().backend().category().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendCategory> {
    return this.fusio.getClient().backend().category().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/category';
  }

}
