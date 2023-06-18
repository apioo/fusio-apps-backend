import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-connection-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Connection> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Connection>> {
    return this.fusio.getClient().connection().getAll(...parameters);
  }

  protected async get(id: string): Promise<Connection> {
    return this.fusio.getClient().connection().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/connection';
  }

}
