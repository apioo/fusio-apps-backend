import {Component} from '@angular/core';
import {Action} from "fusio-sdk/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";
import {Detail} from "../../detail";
import {Connection} from "fusio-sdk/src/generated/backend/Connection";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Connection> {

  protected async create(entity: Connection): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendConnection();
    return await group.getBackendConnection().backendActionConnectionCreate(entity);
  }

  protected async update(entity: Connection): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendConnection();
    return await group.getBackendConnectionByConnectionId('' + entity.id).backendActionConnectionUpdate(entity);
  }

  protected async delete(entity: Connection): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendConnection();
    return await group.getBackendConnectionByConnectionId('' + entity.id).backendActionConnectionDelete();
  }

  protected newEntity(): Connection {
    return {
      name: '',
      class: '',
      config: {}
    };
  }

}
