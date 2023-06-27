import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {EventSubscription} from "fusio-sdk/dist/src/generated/backend/EventSubscription";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, EventSubscription> {

  protected async getAll(parameters: Array<any>): Promise<Collection<EventSubscription>> {
    return this.fusio.getClient().event().getAllSubscriptions(...parameters);
  }

  protected async get(id: string): Promise<EventSubscription> {
    return this.fusio.getClient().event().getSubscription(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/subscription';
  }

}
