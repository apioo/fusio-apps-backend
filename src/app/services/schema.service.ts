import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendSchema, BackendSchemaCreate, BackendSchemaUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class SchemaService extends Service<BackendSchema> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendSchema>> {
    return this.fusio.getClient().backend().schema().getAll(...parameters);
  }

  async get(id: string): Promise<BackendSchema> {
    return this.fusio.getClient().backend().schema().get(id);
  }

  async create(entity: BackendSchema): Promise<CommonMessage> {
    return this.fusio.getClient().backend().schema().create(<BackendSchemaCreate> entity);
  }

  async update(entity: BackendSchema): Promise<CommonMessage> {
    return this.fusio.getClient().backend().schema().update('' + entity.id, <BackendSchemaUpdate> entity);
  }

  async delete(entity: BackendSchema): Promise<CommonMessage> {
    return this.fusio.getClient().backend().schema().delete('' + entity.id);
  }

  newEntity(): BackendSchema {
    return {
      name: ''
    };
  }

  getLink(): Array<string> {
    return ['/', 'schema'];
  }

}
