import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Event> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Event>>> {
    const group = await this.fusio.getClient().backendEvent();
    return await group.getBackendEvent().backendActionEventGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Event>> {
    const group = await this.fusio.getClient().backendEvent();
    return await group.getBackendEventByEventId(id).backendActionEventGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/event';
  }

}
