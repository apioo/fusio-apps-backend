import {Component} from '@angular/core';
import {List} from "../../../list";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {DetailComponent} from "../detail/detail.component";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Schema> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Schema>>> {
    const group = await this.factory.getClient().backendSchema();
    return await group.getBackendSchema().backendActionSchemaGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Schema>> {
    const group = await this.factory.getClient().backendSchema();
    return await group.getBackendSchemaBySchemaId(id).backendActionSchemaGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/schema';
  }

  protected onList() {
  }

  protected onGet() {
  }

}
