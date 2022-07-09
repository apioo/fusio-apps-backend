import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-config-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Config> {

  protected async create(entity: Config): Promise<void> {
  }

  protected async update(entity: Config): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendConfig();
    return await group.getBackendConfigByConfigId('' + entity.id).backendActionConfigUpdate(entity);
  }

  protected async delete(entity: Config): Promise<void> {
  }

  protected newEntity(): Config {
    return {
      name: '',
    };
  }

}
