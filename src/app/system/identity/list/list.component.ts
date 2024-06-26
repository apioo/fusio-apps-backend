import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendIdentity} from "fusio-sdk/dist/BackendIdentity";
import {BackendIdentityCollection} from "fusio-sdk/dist/BackendIdentityCollection";

@Component({
  selector: 'app-identity-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendIdentity> {

  protected async getAll(parameters: Array<any>): Promise<BackendIdentityCollection> {
    return this.fusio.getClient().backend().identity().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendIdentity> {
    return this.fusio.getClient().backend().identity().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/identity';
  }

}
