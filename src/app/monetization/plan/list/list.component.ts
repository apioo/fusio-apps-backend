import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Plan> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Plan>> {
    return this.fusio.getClient().plan().getAll(...parameters);
  }

  protected async get(id: string): Promise<Plan> {
    return this.fusio.getClient().plan().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/plan';
  }

}
