import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Rate> {

  protected async create(entity: Rate): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRate();
    return await group.getBackendRate().backendActionRateCreate(entity);
  }

  protected async update(entity: Rate): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRate();
    return await group.getBackendRateByRateId('' + entity.id).backendActionRateUpdate(entity);
  }

  protected async delete(entity: Rate): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRate();
    return await group.getBackendRateByRateId('' + entity.id).backendActionRateDelete();
  }

  protected newEntity(): Rate {
    return {
      priority: 0,
      name: '',
      rateLimit: 1800,
      timespan: '',
      allocation: []
    };
  }

}
