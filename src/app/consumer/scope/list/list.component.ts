import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Scope> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Scope>>> {
    const resource = await this.fusio.getClient().getBackendScope();
    return await resource.backendActionScopeGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Scope>> {
    const resource = await this.fusio.getClient().getBackendScopeByScopeId(id);
    return await resource.backendActionScopeGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/scope';
  }

}
