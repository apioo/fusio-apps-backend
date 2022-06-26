import {Component} from '@angular/core';
import {List} from "../../list";
import {App_Token} from "fusio-sdk/dist/src/generated/backend/App_Token";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<App_Token> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<App_Token>>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppToken().backendActionAppTokenGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<App_Token>> {
    const group = await this.factory.getClient().backendApp();
    return await group.getBackendAppTokenByTokenId(id).backendActionAppTokenGet();
  }

  protected getDetailComponent(): any {
    return DetailComponent;
  }

  protected getRoute(): any {
    return '/token';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
