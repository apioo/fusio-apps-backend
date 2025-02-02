import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendOperation,
  BackendOperationCreate,
  BackendOperationUpdate,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class OperationService extends Service<BackendOperation> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendOperation>> {
    return this.fusio.getClient().backend().operation().getAll(...parameters);
  }

  async get(id: string): Promise<BackendOperation> {
    return this.fusio.getClient().backend().operation().get(id);
  }

  async create(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().create(<BackendOperationCreate> entity);
  }

  async update(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().update('' + entity.id, <BackendOperationUpdate> entity);
  }

  async delete(entity: BackendOperation): Promise<CommonMessage> {
    return this.fusio.getClient().backend().operation().delete('' + entity.id);
  }

  newEntity(): BackendOperation {
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

  getLink(): Array<string> {
    return ['/', 'operation'];
  }

}
