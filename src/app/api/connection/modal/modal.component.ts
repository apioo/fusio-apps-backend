import {Component} from '@angular/core';
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import {BackendConnection, BackendConnectionIndexEntry, Client, CommonFormContainer, CommonMessage} from "fusio-sdk";

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

  basicConnections: Array<BackendConnectionIndexEntry> = [];
  sdkConnections: Array<BackendConnectionIndexEntry> = [];

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().connection().getClasses();
    this.connections = response.connections;
    this.basicConnections = this.getBasicConnections(this.connections || []);
    this.sdkConnections = this.getSDKConnections(this.connections || []);

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

  getBasicConnections(connections: Array<BackendConnectionIndexEntry>): Array<BackendConnectionIndexEntry> {
    return connections.filter((connection) => {
      return !connection.name?.startsWith('SDK-');
    });
  }

  getSDKConnections(connections: Array<BackendConnectionIndexEntry>): Array<BackendConnectionIndexEntry> {
    return connections.filter((connection) => {
      return connection.name?.startsWith('SDK-');
    }).map((connection) => {
      connection.name = connection.name?.substring(4);
      return connection;
    });
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
