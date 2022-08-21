import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Config> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Category>>> {
    const group = await this.fusio.getClient().backendConfig();
    return await group.getBackendConfig().backendActionConfigGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const group = await this.fusio.getClient().backendConfig();
    return await group.getBackendConfigByConfigId(id).backendActionConfigGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/config';
  }

}
