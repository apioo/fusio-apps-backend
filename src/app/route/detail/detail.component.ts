import {Component} from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Route_Version} from "fusio-sdk/dist/src/generated/backend/Route_Version";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Config, HttpResponse} from "../config";
import {AxiosResponse} from "axios";
import {Detail} from "../../detail";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-route-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<ModelRoute> {

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
    const schema = await this.factory.getClient().backendSchema();
    const response = await schema.getBackendSchema().backendActionSchemaGetAll({count: 1024});
    if (response.data.entry) {
      this.schemas = response.data.entry;
    }
  }

  private async loadActions() {
    const action = await this.factory.getClient().backendAction();
    const response = await action.getBackendAction().backendActionActionGetAll({count: 1024});
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

  newVersion(): Route_Version {
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

  newMethod(): Route_Method {
    return {
      active: true,
      public: true,
      responses: {
        '200': 'Passthru'
      },
      action: ''
    }
  }

  newEmptyMethod(): Route_Method {
    return {
      active: false,
      responses: {}
    }
  }

  transformMethods(methods?: Route_Methods): Array<Route_Method> {
    return Config.transformMethods(methods, false);
  }

  transformResponses(responses?: Route_Method_Responses): Array<HttpResponse> {
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
    const group = await this.factory.getClient().backendRoute();
    return await group.getBackendRoutes().backendActionRouteCreate(entity);
  }

  protected async update(entity: ModelRoute): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRoute();
    return await group.getBackendRoutesByRouteId('' + entity.id).backendActionRouteUpdate(entity);
  }

  protected async delete(entity: ModelRoute): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRoute();
    return await group.getBackendRoutesByRouteId('' + entity.id).backendActionRouteDelete();
  }

  protected newEntity(): ModelRoute {
    return {
      path: '',
      scopes: [],
      config: []
    };
  }

}
