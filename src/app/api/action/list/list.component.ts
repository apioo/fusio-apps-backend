import {Component} from '@angular/core';
import {ModalComponent} from "../modal/modal.component";
import {List} from "ngx-fusio-sdk";
import {BackendAction, BackendActionCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendAction> {

  protected async getAll(parameters: Array<any>): Promise<BackendActionCollection> {
    return this.fusio.getClient().backend().action().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendAction> {
    return this.fusio.getClient().backend().action().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/action';
  }

}
