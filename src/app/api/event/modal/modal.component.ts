import { Component, OnInit } from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Event> {

  schemas?: Array<Schema>;

  override async ngOnInit(): Promise<void> {
    const schema = await this.factory.getClient().backendSchema();
    const response = await schema.getBackendSchema().backendActionSchemaGetAll({count: 1024});
    this.schemas = response.data.entry;
  }

  protected async create(entity: Event): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEvent().backendActionEventCreate(entity);
  }

  protected async update(entity: Event): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventByEventId('' + entity.id).backendActionEventUpdate(entity);
  }

  protected async delete(entity: Event): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendEvent();
    return await group.getBackendEventByEventId('' + entity.id).backendActionEventDelete();
  }

  protected newEntity(): Event {
    return {
      name: '',
      description: ''
    };
  }

}
