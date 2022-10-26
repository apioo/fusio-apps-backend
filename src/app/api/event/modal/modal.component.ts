import { Component, OnInit } from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Event> {

  schemas?: Array<Schema>;

  override async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendSchema();
    const response = await resource.backendActionSchemaGetAll({count: 1024});
    this.schemas = response.data.entry;
  }

  protected async create(entity: Event): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEvent();
    return await resource.backendActionEventCreate(entity);
  }

  protected async update(entity: Event): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEventByEventId('' + entity.id);
    return await resource.backendActionEventUpdate(entity);
  }

  protected async delete(entity: Event): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendEventByEventId('' + entity.id);
    return await resource.backendActionEventDelete();
  }

  protected newEntity(): Event {
    return {
      name: '',
      description: ''
    };
  }

}
