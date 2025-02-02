import {Injectable} from '@angular/core';
import {FusioService, Service} from "ngx-fusio-sdk";
import {BackendRate, BackendRateCreate, BackendRateUpdate, CommonCollection, CommonMessage} from "fusio-sdk";

@Injectable({
  providedIn: 'root'
})
export class RateService extends Service<BackendRate> {

  constructor(private fusio: FusioService) {
    super();
  }

  async getAll(parameters: Array<any>): Promise<CommonCollection<BackendRate>> {
    return this.fusio.getClient().backend().rate().getAll(...parameters);
  }

  async get(id: string): Promise<BackendRate> {
    return this.fusio.getClient().backend().rate().get(id);
  }

  async create(entity: BackendRate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().rate().create(<BackendRateCreate> entity);
  }

  async update(entity: BackendRate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().rate().update('' + entity.id, <BackendRateUpdate> entity);
  }

  async delete(entity: BackendRate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().rate().delete('' + entity.id);
  }

  newEntity(): BackendRate {
    return {
      priority: 0,
      name: '',
      rateLimit: 1800,
      timespan: '',
      allocation: []
    };
  }

  getLink(): Array<string> {
    return ['/', 'rate'];
  }

}
