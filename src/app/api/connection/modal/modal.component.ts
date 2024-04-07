import {Component} from '@angular/core';
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendConnection} from "fusio-sdk/dist/BackendConnection";
import {BackendConnectionIndexEntry} from "fusio-sdk/dist/BackendConnectionIndexEntry";
import {CommonFormContainer} from "fusio-sdk/dist/CommonFormContainer";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-connection-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendConnection> {

  connections?: Array<BackendConnectionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().connection().getClasses();
    this.connections = response.connections;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().create(entity);
  }

  protected async update(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendConnection): Promise<CommonMessage> {
    return this.fusio.getClient().backend().connection().delete('' + entity.id);
  }

  protected newEntity(): BackendConnection {
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

    this.form = await this.fusio.getClient().backend().connection().getForm(classString);

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
