import {Component} from '@angular/core';
import {List} from "../../../list";
import {Log_Error} from "fusio-sdk/dist/src/generated/backend/Log_Error";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";

@Component({
  selector: 'app-error-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Log_Error> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Log_Error>>> {
    const group = await this.factory.getClient().backendLog();
    return await group.getBackendLogError().backendActionLogErrorGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Log_Error>> {
    const group = await this.factory.getClient().backendLog();
    return await group.getBackendLogErrorByErrorId(id).backendActionLogErrorGet();
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/error';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
