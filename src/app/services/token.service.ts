import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendToken, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TokenService extends Service<BackendToken> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendToken>> {
    return this.fusio.getClient().backend().token().getAll(...parameters);
  }

  async get(id: string): Promise<BackendToken> {
    return this.fusio.getClient().backend().token().get(id);
  }

  async create(entity: BackendToken): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendToken): Promise<CommonMessage> {
    return {};
  }

  async delete(entity: BackendToken): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendToken {
    return {};
  }

  getLink(): Array<string> {
    return ['/', 'token'];
  }

}
