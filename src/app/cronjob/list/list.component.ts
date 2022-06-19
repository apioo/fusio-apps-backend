import {Component} from '@angular/core';
import {List} from "../../list";
import {Cronjob} from "fusio-sdk/src/generated/backend/Cronjob";
import {Collection_Category_Query} from "fusio-sdk/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Cronjob> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Cronjob>>> {
    const group = await this.factory.getClient().backendCronjob();
    return await group.getBackendCronjob().backendActionCronjobGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Cronjob>> {
    const group = await this.factory.getClient().backendCronjob();
    return await group.getBackendCronjobByCronjobId(id).backendActionCronjobGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/cronjob';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
