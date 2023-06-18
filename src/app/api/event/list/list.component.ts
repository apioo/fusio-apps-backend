import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Event> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Event>> {
    return this.fusio.getClient().event().getAll(...parameters);
  }

  protected async get(id: string): Promise<Event> {
    return this.fusio.getClient().event().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/event';
  }

}
