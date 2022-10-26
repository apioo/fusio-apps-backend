import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Cronjob> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Cronjob>>> {
    const resource = await this.fusio.getClient().getBackendCronjob();
    return await resource.backendActionCronjobGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Cronjob>> {
    const resource = await this.fusio.getClient().getBackendCronjobByCronjobId(id);
    return await resource.backendActionCronjobGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/cronjob';
  }

}
