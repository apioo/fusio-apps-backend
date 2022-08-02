import {Component} from '@angular/core';
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Config> {

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
