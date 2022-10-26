import { Component, OnInit } from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Config, HttpResponse} from "../config";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {RouteVersion} from "fusio-sdk/dist/src/generated/backend/RouteVersion";
import {RouteMethod} from "fusio-sdk/dist/src/generated/backend/RouteMethod";
import {RouteMethods} from "fusio-sdk/dist/src/generated/backend/RouteMethods";
import {RouteMethodResponses} from "fusio-sdk/dist/src/generated/backend/RouteMethodResponses";

@Component({
  selector: 'app-route-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, ModelRoute> {

  methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  schemas: Array<Schema> = []
  actions: Array<Action> = []

  activeVersion: number = 1;
  activeMethod: string = 'GET';
  responseCode: string = '200';

  statuuus = [{
    key: 4,
    value: 'Development'
  }, {
    key: 1,
    value: 'Production'
  }, {
    key: 2,
    value: 'Deprecated'
  }, {
    key: 3,
    value: 'Closed'
  }]

  statusCodes = {
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '204': 'No Content',
    '205': 'Reset Content',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '412': 'Precondition Failed',
    '417': 'Expectation Failed',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '429': 'Too Many Requests',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected'
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();
    await this.loadSchemas();
    await this.loadActions();
    if (this.entity && this.entity.config?.length === 0) {
      this.addVersion();
    }
  }

  private async loadSchemas() {
    const schema = await this.fusio.getClient().getBackendSchema();
    const response = await schema.backendActionSchemaGetAll({count: 1024});
    if (response.data.entry) {
      this.schemas = response.data.entry;
    }
  }

  private async loadActions() {
    const action = await this.fusio.getClient().getBackendAction();
    const response = await action.backendActionActionGetAll({count: 1024});
    if (response.data.entry) {
      this.actions = response.data.entry;
    }
  }

  addVersion() {
    if (!this.entity || !this.entity.config) {
      return;
    }

    this.entity.config.push(this.newVersion());
  }

  newVersion(): RouteVersion {
    const newVersion = Config.getLatestVersion(this.entity) + 1;
    this.activeVersion = newVersion;

    return {
      version: newVersion,
      status: 4,
      methods: {
        GET: this.newMethod(),
        POST: this.newEmptyMethod(),
        PUT: this.newEmptyMethod(),
        PATCH: this.newEmptyMethod(),
        DELETE: this.newEmptyMethod()
      }
    }
  }

  newMethod(): RouteMethod {
    return {
      active: true,
      public: true,
      responses: {
        '200': 'Passthru'
      },
      action: ''
    }
  }

  newEmptyMethod(): RouteMethod {
    return {
      active: false,
      responses: {}
    }
  }

  transformMethods(methods?: RouteMethods): Array<RouteMethod> {
    return Config.transformMethods(methods, false);
  }

  transformResponses(responses?: RouteMethodResponses): Array<HttpResponse> {
    return Config.transformResponses(responses);
  }

  addResponse(statusCode: string) {
    const method = Config.getActiveMethod(this.entity, this.activeVersion, this.activeMethod);
    if (!method) {
      return;
    }

    if (!method.responses) {
      method.responses = {
        statusCode: 'Passthru'
      };
    } else {
      method.responses[statusCode] = 'Passthru';
    }
  }

  removeResponse(statusCode: string) {
    const method = Config.getActiveMethod(this.entity, this.activeVersion, this.activeMethod);
    if (!method) {
      return;
    }

    if (method.responses && method.responses[statusCode]) {
      delete method.responses[statusCode];
    }
  }

  protected async create(entity: ModelRoute): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRoutes();
    return await resource.backendActionRouteCreate(entity);
  }

  protected async update(entity: ModelRoute): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRoutesByRouteId('' + entity.id);
    return await resource.backendActionRouteUpdate(entity);
  }

  protected async delete(entity: ModelRoute): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRoutesByRouteId('' + entity.id);
    return await resource.backendActionRouteDelete();
  }

  protected newEntity(): ModelRoute {
    return {
      path: '',
      scopes: [],
      config: []
    };
  }

}
