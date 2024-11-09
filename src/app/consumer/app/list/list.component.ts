import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendApp, BackendAppCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendApp> {

  protected async getAll(parameters: Array<any>): Promise<BackendAppCollection> {
    return this.fusio.getClient().backend().app().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendApp> {
    return this.fusio.getClient().backend().app().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/app';
  }

}
