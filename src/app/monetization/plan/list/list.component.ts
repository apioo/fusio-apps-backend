import {Component} from '@angular/core';
import {List} from "../../../list";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Plan> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Plan>>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlan().backendActionPlanGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Plan>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlanByPlanId(id).backendActionPlanGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/plan';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
