import {Component, signal} from '@angular/core';
import {ErrorService, Form, HelpComponent, MessageComponent} from "ngx-fusio-sdk";
import {BackendConnection, BackendConnectionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {ConfigComponent} from "../../../shared/config/config.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-connection-form',
  templateUrl: './form.component.html',
  imports: [
    RouterLink,
    FormBreadcrump,
    FormButtons,
    ConfigComponent,
    MessageComponent,
    FormsModule,
    NgbPopover
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendConnection> {

  basicConnections = signal<Array<BackendConnectionIndexEntry>>([]);
  sdkConnections = signal<Array<BackendConnectionIndexEntry>>([]);
  form = signal<CommonFormContainer|undefined>(undefined);
  custom = signal<boolean>(false);

  connections: Array<BackendConnectionIndexEntry> = [];
  entityClass?: string;

  constructor(private service: ConnectionService, private fusio: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    const response = await this.fusio.getClient().backend().connection().getClasses();

    this.connections = response.connections || [];

    this.basicConnections.set(this.getBasicConnections(this.connections));
    this.sdkConnections.set(this.getSDKConnections(this.connections));

    const className = this.entity().class;
    if (className) {
      this.loadConfig(className);
    }
  }

  async loadConfig(classString?: string) {
    if (!classString || !this.entity) {
      return;
    }

    try {
      this.form.set(await this.fusio.getClient().backend().connection().getForm(classString));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    const hasChanged = this.entityClass && this.entityClass !== this.entity().class;
    this.entityClass = this.entity().class;

    if (hasChanged) {
      this.set(this.entity, 'config', {});
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
    if (!this.entity) {
      return;
    }

    let className = this.entity().class;
    if (className) {
      let connection = this.connections?.find((connection) => {
        return connection.class === className;
      })

      if (connection && connection.name) {
        const modalRef = this.modal.open(HelpComponent, {
          size: 'lg'
        });
        modalRef.componentInstance.path = 'api/connection/' + connection.name.toLowerCase() + '/';
      }
    }
  }
}
