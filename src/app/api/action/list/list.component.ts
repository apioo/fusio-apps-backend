import {Component} from '@angular/core';
import {List} from "../../../list";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-action-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Action> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Action>>> {
    const group = await this.factory.getClient().backendAction();
    return await group.getBackendAction().backendActionActionGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Action>> {
    const group = await this.factory.getClient().backendAction();
    return await group.getBackendActionByActionId(id).backendActionActionGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/action';
  }

  protected onList() {
  }

  protected onGet(): void {
  }

}
