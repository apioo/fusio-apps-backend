import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, App> {

  protected async getAll(parameters: Array<any>): Promise<Collection<App>> {
    return this.fusio.getClient().app().getAll(...parameters);
  }

  protected async get(id: string): Promise<App> {
    return this.fusio.getClient().app().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/app';
  }

}
