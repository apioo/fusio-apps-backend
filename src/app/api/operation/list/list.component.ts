import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendOperation} from "fusio-sdk/dist/BackendOperation";
import {BackendOperationCollection} from "fusio-sdk/dist/BackendOperationCollection";

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendOperation> {

  protected async getAll(parameters: Array<any>): Promise<BackendOperationCollection> {
    return this.fusio.getClient().backend().operation().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendOperation> {
    return this.fusio.getClient().backend().operation().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/operation';
  }

}
