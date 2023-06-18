import {Component} from '@angular/core';
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Config> {

  protected async create(entity: Config): Promise<void> {
  }

  protected async update(entity: Config): Promise<Message> {
    return this.fusio.getClient().config().update('' + entity.id, entity);
  }

  protected async delete(entity: Config): Promise<void> {
  }

  protected newEntity(): Config {
    return {
      name: '',
    };
  }

}
