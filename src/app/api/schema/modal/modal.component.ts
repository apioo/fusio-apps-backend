import { Component, OnInit } from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-schema-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Schema> {

  schema: string = '';

  override ngOnInit(): void {
    if (this.entity && this.entity.source) {
      this.schema = JSON.stringify(this.entity.source, null, 2);
    }
  }

  protected async create(entity: Schema): Promise<AxiosResponse<Message>> {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    const resource = await this.fusio.getClient().getBackendSchema();
    return await resource.backendActionSchemaCreate(entity);
  }

  protected async update(entity: Schema): Promise<AxiosResponse<Message>> {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    const resource = await this.fusio.getClient().getBackendSchemaBySchemaId('' + entity.id);
    return await resource.backendActionSchemaUpdate(entity);
  }

  protected async delete(entity: Schema): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendSchemaBySchemaId('' + entity.id);
    return await resource.backendActionSchemaDelete();
  }

  protected newEntity(): Schema {
    return {
      name: ''
    };
  }

}
