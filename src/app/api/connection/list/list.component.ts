import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {BackendConnection, BackendConnectionCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendConnection> {

  protected async getAll(parameters: Array<any>): Promise<BackendConnectionCollection> {
    return this.fusio.getClient().backend().connection().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendConnection> {
    return this.fusio.getClient().backend().connection().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/connection';
  }

}
