import { Component, OnInit } from '@angular/core';
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-operation-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Operation> {

  schemas: Array<Schema> = []
  actions: Array<Action> = []

  stabilities = [{
    key: 0,
    value: 'Deprecated'
  }, {
    key: 1,
    value: 'Experimental'
  }, {
    key: 2,
    value: 'Stable'
  }, {
    key: 3,
    value: 'Legacy'
  }]

  methods = [{
    key: 'GET',
    value: 'GET'
  }, {
    key: 'POST',
    value: 'POST'
  }, {
    key: 'PUT',
    value: 'PUT'
  }, {
    key: 'PATCH',
    value: 'PATCH'
  }, {
    key: 'DELETE',
    value: 'DELETE'
  }]

  successStatusCodes = {
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '204': 'No Content',
    '205': 'Reset Content',
  }

  errorStatusCodes = {
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
  }

  private async loadSchemas() {
    const response = await this.fusio.getClient().schema().getAll(0, 1024);
    if (response.entry) {
      this.schemas = response.entry;
    }
  }

  private async loadActions() {
    const response = await this.fusio.getClient().action().getAll(0, 1024);
    if (response.entry) {
      this.actions = response.entry;
    }
  }

  protected async create(entity: Operation): Promise<Message> {
    return this.fusio.getClient().operation().create(entity);
  }

  protected async update(entity: Operation): Promise<Message> {
    return this.fusio.getClient().operation().update('' + entity.id, entity);
  }

  protected async delete(entity: Operation): Promise<Message> {
    return this.fusio.getClient().operation().delete('' + entity.id);
  }

  protected newEntity(): Operation {
    return {
      name: '',
      stability: 1,
      httpMethod: 'GET',
      httpPath: '',
      httpCode: 200,
      parameters: {},
      throws: {},
    };
  }

  public isDisabled(): boolean {
    return this.mode === 3 || (this.entity.stability === 2 || this.entity.stability === 3);
  }

}
