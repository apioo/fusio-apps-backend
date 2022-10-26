import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";
import {CollectionCategoryQuery} from "fusio-sdk/dist/src/generated/backend/CollectionCategoryQuery";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Schema> {

  protected async getAll(query: CollectionCategoryQuery): Promise<AxiosResponse<Collection<Schema>>> {
    const resource = await this.fusio.getClient().getBackendSchema();
    return await resource.backendActionSchemaGetAll(query);
  }

  protected async get(id: string): Promise<AxiosResponse<Schema>> {
    const resource = await this.fusio.getClient().getBackendSchemaBySchemaId(id);
    return await resource.backendActionSchemaGet();
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/schema';
  }

}
