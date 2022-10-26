import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {EventSubscription} from "fusio-sdk/dist/src/generated/backend/EventSubscription";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, EventSubscription> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<EventSubscription>>> {
    const resource = await this.fusio.getClient().getBackendEventSubscription();
    return await resource.backendActionEventSubscriptionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<EventSubscription>> {
    const resource = await this.fusio.getClient().getBackendEventSubscriptionBySubscriptionId(id);
    return await resource.backendActionEventSubscriptionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/subscription';
  }

}
