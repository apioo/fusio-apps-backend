import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Event> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Event>>> {
    const resource = await this.fusio.getClient().getBackendEvent();
    return await resource.backendActionEventGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Event>> {
    const resource = await this.fusio.getClient().getBackendEventByEventId(id);
    return await resource.backendActionEventGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/event';
  }

}
