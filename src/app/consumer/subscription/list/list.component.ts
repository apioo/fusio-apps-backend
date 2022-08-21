import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Event_Subscription} from "fusio-sdk/dist/src/generated/backend/Event_Subscription";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Event_Subscription> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Event_Subscription>>> {
    const group = await this.fusio.getClient().backendEvent();
    return await group.getBackendEventSubscription().backendActionEventSubscriptionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Event_Subscription>> {
    const group = await this.fusio.getClient().backendEvent();
    return await group.getBackendEventSubscriptionBySubscriptionId(id).backendActionEventSubscriptionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/subscription';
  }

}
