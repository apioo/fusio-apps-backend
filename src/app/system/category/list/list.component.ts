import {Component} from '@angular/core';
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Category> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Category>> {
    return this.fusio.getClient().category().getAll(...parameters);
  }

  protected async get(id: string): Promise<Category> {
    return this.fusio.getClient().category().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/category';
  }

}
