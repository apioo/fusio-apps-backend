import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendRole, BackendTransaction, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends Service<BackendRole> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendTransaction>> {
    return this.fusio.getClient().backend().transaction().getAll(...parameters);
  }

  async get(id: string): Promise<BackendRole> {
    return this.fusio.getClient().backend().transaction().get(id);
  }

  async create(entity: BackendTransaction): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendTransaction): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendTransaction): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendTransaction {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'transaction'];
  }

}
