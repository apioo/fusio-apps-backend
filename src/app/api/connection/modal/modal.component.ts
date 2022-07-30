import {Component} from '@angular/core';
import {Connection_Index_Entry} from "fusio-sdk/dist/src/generated/backend/Connection_Index_Entry";
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Form_Query} from "fusio-sdk/dist/src/generated/backend/Form_Query";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-connection-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Connection> {

  actions?: Array<Connection_Index_Entry>;
  form?: Form_Container;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const action = await this.factory.getClient().backendConnection();
    const response = await action.getBackendConnectionList().backendActionConnectionGetIndex();
    this.actions = response.data.connections;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

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

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    const query: Form_Query = {
      class: classString
    };

    const action = await this.factory.getClient().backendConnection();
    const response = await action.getBackendConnectionForm().backendActionConnectionGetForm(query);
    this.form = response.data;
    this.entity.config = {};
  }

}
