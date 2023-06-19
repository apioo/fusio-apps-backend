import {Component} from '@angular/core';
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {ConnectionIndexEntry} from "fusio-sdk/dist/src/generated/backend/ConnectionIndexEntry";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";

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
    const response = await this.fusio.getClient().connection().getClasses();
    this.connections = response.connections;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: Connection): Promise<Message> {
    return this.fusio.getClient().connection().create(entity);
  }

  protected async update(entity: Connection): Promise<Message> {
    return this.fusio.getClient().connection().update('' + entity.id, entity);
  }

  protected async delete(entity: Connection): Promise<Message> {
    return this.fusio.getClient().connection().delete('' + entity.id);
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

    this.form = await this.fusio.getClient().connection().getForm(classString);

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
        modalRef.componentInstance.path = 'api/connection/' + connection.name.toLowerCase() + '/';
      }
    }
  }
}
