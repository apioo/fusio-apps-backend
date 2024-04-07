import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendUser} from "fusio-sdk/dist/BackendUser";
import {BackendUserCollection} from "fusio-sdk/dist/BackendUserCollection";

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
