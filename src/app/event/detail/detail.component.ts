import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Collection_Category_Query} from "fusio-sdk/dist/src/generated/backend/Collection_Category_Query";

@Component({
  selector: 'app-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event> {

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
