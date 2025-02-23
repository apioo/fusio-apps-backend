import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendTest, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class TestService extends Service<BackendTest> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendTest>> {
    return this.fusio.getClient().backend().test().getAll(...parameters);
  }

  async get(id: string): Promise<BackendTest> {
    return this.fusio.getClient().backend().test().get(id);
  }

  async create(entity: BackendTest): Promise<CommonMessage> {
    return {};
  }

  async update(entity: BackendTest): Promise<CommonMessage> {
    return this.fusio.getClient().backend().test().update('' + entity.id, entity);
  }

  async delete(entity: BackendTest): Promise<CommonMessage> {
    return {};
  }

  newEntity(): BackendTest {
    return {
    };
  }

  getLink(): Array<string> {
    return ['/', 'test'];
  }

}
