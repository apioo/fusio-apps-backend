import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Page> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Page>> {
    return this.fusio.getClient().page().getAll(...parameters);
  }

  protected async get(id: string): Promise<Page> {
    return this.fusio.getClient().page().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/page';
  }

}
