import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Response} from "../../message/message.component";
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {Route_Version} from "fusio-sdk/dist/src/generated/backend/Route_Version";
import {Route_Method} from "fusio-sdk/dist/src/generated/backend/Route_Method";
import {Route_Methods} from "fusio-sdk/dist/src/generated/backend/Route_Methods";
import {Route_Method_Responses} from "fusio-sdk/dist/src/generated/backend/Route_Method_Responses";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Config, HttpResponse} from "../config";
import {FactoryService} from "../../factory.service";
import axios, {AxiosError} from "axios";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  response?: Response;
  route: ModelRoute = {
    path: '',
    scopes: [],
    config: []
  };

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

  constructor(private factory: FactoryService, public modal: NgbActiveModal) { }

  async ngOnInit(): Promise<void> {
    this.addVersion();
    await this.loadSchemas();
    await this.loadActions();
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

  async submit() {
    const data = this.route;

    const route = await this.factory.getClient().backendRoute();

    try {
      const response = await route.getBackendRoutes().backendActionRouteCreate(data);
      this.modal.close(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Response;
      } else {
        throw error;
      }
    }
  }

  addVersion() {
    if (!this.route.config) {
      return;
    }

    this.route.config.push(this.newVersion());
  }

  newVersion(): Route_Version {
    const newVersion = Config.getLatestVersion() + 1;
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
    const method = Config.getActiveMethod(this.route, this.activeVersion, this.activeMethod);
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
    const method = Config.getActiveMethod(this.route, this.activeVersion, this.activeMethod);
    if (!method) {
      return;
    }

    if (method.responses && method.responses[statusCode]) {
      delete method.responses[statusCode];
    }
  }

  showHelp(path: string) {
  }

  parseCsv(scopes: string): Array<string> {
    if (!scopes) {
      return [];
    }

    return scopes.split(',').map((el) => {
      return el.trim();
    }).filter(Boolean);
  }

}
