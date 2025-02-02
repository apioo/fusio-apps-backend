import {Component} from '@angular/core';
import {ErrorService, Form, HelpComponent} from "ngx-fusio-sdk";
import {BackendConnection, BackendConnectionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-connection-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendConnection> {

  connections?: Array<BackendConnectionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;
  custom: boolean = false;

  basicConnections: Array<BackendConnectionIndexEntry> = [];
  sdkConnections: Array<BackendConnectionIndexEntry> = [];

  constructor(private service: ConnectionService, private fusio: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    const response = await this.fusio.getClient().backend().connection().getClasses();
    this.connections = response.connections;
    this.basicConnections = this.getBasicConnections(this.connections || []);
    this.sdkConnections = this.getSDKConnections(this.connections || []);

    if (this.entity && this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  async loadConfig(classString?: string) {
    if (!classString || !this.entity) {
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
    if (!this.entity) {
      return;
    }

    let className = this.entity.class;
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
