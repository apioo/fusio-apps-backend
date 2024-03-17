import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {BackendEvent, BackendEventCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendEvent> {

  protected async getAll(parameters: Array<any>): Promise<BackendEventCollection> {
    return this.fusio.getClient().backend().event().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendEvent> {
    return this.fusio.getClient().backend().event().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/event';
  }

}
