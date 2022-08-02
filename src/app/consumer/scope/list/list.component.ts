import {Component} from '@angular/core';
import {List} from "../../../list";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Scope> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Scope>>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScope().backendActionScopeGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Scope>> {
    const group = await this.factory.getClient().backendScope();
    return await group.getBackendScopeByScopeId(id).backendActionScopeGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/scope';
  }

}
