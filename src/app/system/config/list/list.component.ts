import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Config> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Category>>> {
    const resource = await this.fusio.getClient().getBackendConfig();
    return await resource.backendActionConfigGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Category>> {
    const resource = await this.fusio.getClient().getBackendConfigByConfigId(id);
    return await resource.backendActionConfigGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/config';
  }

}
