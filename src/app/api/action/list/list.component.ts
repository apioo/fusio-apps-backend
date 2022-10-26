import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Action> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Action>>> {
    const resource = await this.fusio.getClient().getBackendAction();
    return await resource.backendActionActionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Action>> {
    const resource = await this.fusio.getClient().getBackendActionByActionId(id);
    return await resource.backendActionActionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/action';
  }

}
