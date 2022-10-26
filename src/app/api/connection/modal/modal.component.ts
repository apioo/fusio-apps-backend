import {Component} from '@angular/core';
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {ConnectionIndexEntry} from "fusio-sdk/dist/src/generated/backend/ConnectionIndexEntry";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {FormQuery} from "fusio-sdk/dist/src/generated/backend/FormQuery";

@Component({
  selector: 'app-connection-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Connection> {

  connections?: Array<ConnectionIndexEntry>;
  form?: FormContainer;
  entityClass?: string;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendConnectionList();
    const response = await resource.backendActionConnectionGetIndex();
    this.connections = response.data.connections;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: Connection): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendConnection();
    return await resource.backendActionConnectionCreate(entity);
  }

  protected async update(entity: Connection): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendConnectionByConnectionId('' + entity.id);
    return await resource.backendActionConnectionUpdate(entity);
  }

  protected async delete(entity: Connection): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendConnectionByConnectionId('' + entity.id);
    return await resource.backendActionConnectionDelete();
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

    const query: FormQuery = {
      class: classString
    };

    const resource = await this.fusio.getClient().getBackendConnectionForm();
    const response = await resource.backendActionConnectionGetForm(query);
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
