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

  stabilities = [
    {key: 0, value: 'Deprecated'},
    {key: 1, value: 'Experimental'},
    {key: 2, value: 'Stable'},
    {key: 3, value: 'Legacy'}
  ]

  methods = [
    {key: 'GET', value: 'GET'},
    {key: 'POST', value: 'POST'},
    {key: 'PUT', value: 'PUT'},
    {key: 'PATCH', value: 'PATCH'},
    {key: 'DELETE', value: 'DELETE'}
  ]

  successStatusCodes = [
    {key: 200, value: 'OK'},
    {key: 201, value: 'Created'},
    {key: 202, value: 'Accepted'},
    {key: 204, value: 'No Content'},
    {key: 205, value: 'Reset Content'},
  ]

  errorStatusCodes = [
    {key: 400, value: 'Bad Request'},
    {key: 402, value: 'Payment Required'},
    {key: 403, value: 'Forbidden'},
    {key: 404, value: 'Not Found'},
    {key: 405, value: 'Method Not Allowed'},
    {key: 408, value: 'Request Timeout'},
    {key: 409, value: 'Conflict'},
    {key: 410, value: 'Gone'},
    {key: 412, value: 'Precondition Failed'},
    {key: 417, value: 'Expectation Failed'},
    {key: 422, value: 'Unprocessable Entity'},
    {key: 423, value: 'Locked'},
    {key: 424, value: 'Failed Dependency'},
    {key: 429, value: 'Too Many Requests'},
    {key: 500, value: 'Internal Server Error'},
    {key: 501, value: 'Not Implemented'},
    {key: 502, value: 'Bad Gateway'},
    {key: 503, value: 'Service Unavailable'},
    {key: 504, value: 'Gateway Timeout'},
    {key: 507, value: 'Insufficient Storage'},
    {key: 508, value: 'Loop Detected'},
  ]

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
      active: true,
      public: false,
      stability: 1,
      httpMethod: 'GET',
      httpPath: '',
      httpCode: 200,
      parameters: {},
      outgoing: 'schema://Passthru',
      throws: {},
    };
  }

  public isDisabled(): boolean {
    return this.mode === 3 || (this.entity.stability === 2 || this.entity.stability === 3);
  }

  changeHttpMethod(): void {
    if (this.entity.incoming && (this.entity.httpMethod === 'GET' || this.entity.httpMethod === 'DELETE')) {
      delete this.entity.incoming;
    }
  }

}
