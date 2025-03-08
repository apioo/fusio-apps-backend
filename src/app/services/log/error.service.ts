import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {
  BackendAction,
  BackendActionCreate,
  BackendActionUpdate,
  BackendLogError,
  CommonCollection,
  CommonMessage
} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class ErrorService extends Service<BackendLogError> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendLogError>> {
    return this.fusio.getClient().backend().log().getAllErrors(...parameters);
  }

  async get(id: string): Promise<BackendLogError> {
    return this.fusio.getClient().backend().log().getError(id);
  }

  async create(entity: BackendAction): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendAction): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendAction): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendAction {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'log'];
  }

}
