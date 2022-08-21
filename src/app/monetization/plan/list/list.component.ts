import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Plan> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Plan>>> {
    const group = await this.fusio.getClient().backendPlan();
    return await group.getBackendPlan().backendActionPlanGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Plan>> {
    const group = await this.fusio.getClient().backendPlan();
    return await group.getBackendPlanByPlanId(id).backendActionPlanGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/plan';
  }

}
