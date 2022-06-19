import {Component} from '@angular/core';
import {List} from "../../list";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/src/generated/backend/Collection";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Event> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Event>>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEvent().backendActionEventGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Event>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventByEventId(id).backendActionEventGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/event';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
