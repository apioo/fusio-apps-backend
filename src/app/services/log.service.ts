import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendLog, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class LogService extends Service<BackendLog> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendLog>> {
    return this.fusio.getClient().backend().log().getAll(...parameters);
  }

  async get(id: string): Promise<BackendLog> {
    return this.fusio.getClient().backend().log().get(id);
  }

  async create(entity: BackendLog): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendLog): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendLog): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendLog {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'log'];
  }

}
