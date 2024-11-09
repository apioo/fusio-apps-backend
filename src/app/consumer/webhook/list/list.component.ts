import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendWebhook, BackendWebhookCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-webhook-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendWebhook> {

  protected async getAll(parameters: Array<any>): Promise<BackendWebhookCollection> {
    return this.fusio.getClient().backend().webhook().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendWebhook> {
    return this.fusio.getClient().backend().webhook().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/webhook';
  }

}
