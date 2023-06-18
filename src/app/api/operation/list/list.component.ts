import {Component} from '@angular/core';
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-operation-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Operation> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Operation>> {
    return this.fusio.getClient().operation().getAll(...parameters);
  }

  protected async get(id: string): Promise<Operation> {
    return this.fusio.getClient().operation().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/operation';
  }

}
