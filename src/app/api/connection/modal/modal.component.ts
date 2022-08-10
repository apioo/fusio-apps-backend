import {Component} from '@angular/core';
import {Connection_Index_Entry} from "fusio-sdk/dist/src/generated/backend/Connection_Index_Entry";
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Form_Query} from "fusio-sdk/dist/src/generated/backend/Form_Query";
import {Modal} from "../../../modal";
import {HelpComponent} from "../../../shared/help/help.component";

@Component({
  selector: 'app-connection-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Connection> {

  connections?: Array<Connection_Index_Entry>;
  form?: Form_Container;
  entityClass?: string;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const action = await this.factory.getClient().backendConnection();
    const response = await action.getBackendConnectionList().backendActionConnectionGetIndex();
    this.connections = response.data.connections;

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

    const hasChanged = this.entityClass && this.entityClass !== this.entity.class;
    this.entityClass = this.entity.class;

    if (hasChanged) {
      this.entity.config = {};
    }
  }

  showHelp() {
    let className = this.entity.class;
    if (className) {
      let connection = this.connections?.find((connection) => {
        return connection.class === className;
      })

      if (connection && connection.name) {
        const modalRef = this.modalService.open(HelpComponent, {
          size: 'lg'
        });
        modalRef.componentInstance.path = 'api/connection/' + connection.name.toLowerCase();
      }
    }
  }
}
