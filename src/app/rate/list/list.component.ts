import {Component} from '@angular/core';
import {List} from "../../list";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-rate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Rate> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Rate>>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlan().backendActionPlanGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Rate>> {
    const group = await this.factory.getClient().backendPlan();
    return await group.getBackendPlanByPlanId(id).backendActionPlanGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/rate';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
