import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-plan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Plan> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Plan>>> {
    const resource = await this.fusio.getClient().getBackendPlan();
    return await resource.backendActionPlanGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Plan>> {
    const resource = await this.fusio.getClient().getBackendPlanByPlanId(id);
    return await resource.backendActionPlanGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/plan';
  }

}
