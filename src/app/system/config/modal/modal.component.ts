import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendConfig} from "fusio-sdk/dist/BackendConfig";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendConfig> {

  protected async create(entity: BackendConfig): Promise<void> {
  }

  protected async update(entity: BackendConfig): Promise<CommonMessage> {
    return this.fusio.getClient().backend().config().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendConfig): Promise<void> {
  }

  protected newEntity(): BackendConfig {
    return {
      name: '',
    };
  }

}
