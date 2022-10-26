import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {LogError} from "fusio-sdk/dist/src/generated/backend/LogError";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-error-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, LogError> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<LogError>>> {
    const resource = await this.fusio.getClient().getBackendLogError();
    return await resource.backendActionLogErrorGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<LogError>> {
    const resource = await this.fusio.getClient().getBackendLogErrorByErrorId(id);
    return await resource.backendActionLogErrorGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/error';
  }

}
