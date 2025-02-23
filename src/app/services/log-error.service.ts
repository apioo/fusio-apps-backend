import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendLogError, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class LogErrorService extends Service<BackendLogError> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendLogError>> {
    return this.fusio.getClient().backend().log().getAllErrors(...parameters);
  }

  async get(id: string): Promise<BackendLogError> {
    return this.fusio.getClient().backend().log().getError(id);
  }

  async create(entity: BackendLogError): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendLogError): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendLogError): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendLogError {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'error'];
  }

}
