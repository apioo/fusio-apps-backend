import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendAudit, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class AuditService extends Service<BackendAudit> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendAudit>> {
    return this.fusio.getClient().backend().audit().getAll(...parameters);
  }

  async get(id: string): Promise<BackendAudit> {
    return this.fusio.getClient().backend().audit().get(id);
  }

  async create(entity: BackendAudit): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendAudit): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendAudit): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendAudit {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'audit'];
  }

}
