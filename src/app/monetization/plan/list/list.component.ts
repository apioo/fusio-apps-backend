import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendPlan} from "fusio-sdk/dist/BackendPlan";
import {BackendPlanCollection} from "fusio-sdk/dist/BackendPlanCollection";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendPlan> {

  protected async getAll(parameters: Array<any>): Promise<BackendPlanCollection> {
    return this.fusio.getClient().backend().plan().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendPlan> {
    return this.fusio.getClient().backend().plan().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/plan';
  }

}
