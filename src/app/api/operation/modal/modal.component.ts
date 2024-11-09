import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendOperation, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-operation-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendOperation> {

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

  protected async create(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().create(entity);
  }

  protected async update(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().delete('' + entity.id);
  }

  protected newEntity(): BackendOperation {
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
