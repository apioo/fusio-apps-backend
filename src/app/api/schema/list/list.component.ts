import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Schema> {

  protected async getAll(query: Collection_Category_Query): Promise<AxiosResponse<Collection<Schema>>> {
    const group = await this.fusio.getClient().backendSchema();
    return await group.getBackendSchema().backendActionSchemaGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Schema>> {
    const group = await this.fusio.getClient().backendSchema();
    return await group.getBackendSchemaBySchemaId(id).backendActionSchemaGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/schema';
  }

}
