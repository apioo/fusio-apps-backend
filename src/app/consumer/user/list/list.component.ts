import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendUser, BackendUserCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendUser> {

  protected async getAll(parameters: Array<any>): Promise<BackendUserCollection> {
    return this.fusio.getClient().backend().user().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendUser> {
    return this.fusio.getClient().backend().user().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/user';
  }

}
