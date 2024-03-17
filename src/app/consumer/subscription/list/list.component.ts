import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {BackendEventSubscription, BackendEventSubscriptionCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendEventSubscription> {

  protected async getAll(parameters: Array<any>): Promise<BackendEventSubscriptionCollection> {
    return this.fusio.getClient().backend().event().getAllSubscriptions(...parameters);
  }

  protected async get(id: string): Promise<BackendEventSubscription> {
    return this.fusio.getClient().backend().event().getSubscription(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/subscription';
  }

}
