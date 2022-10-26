import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-cronjob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Cronjob> {

  actions?: Array<Action>;

  override async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendAction();
    const response = await resource.backendActionActionGetAll({count: 1024});
    this.actions = response.data.entry;
  }

  protected async create(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCronjob();
    return await resource.backendActionCronjobCreate(entity);
  }

  protected async update(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCronjobByCronjobId('' + entity.id);
    return await resource.backendActionCronjobUpdate(entity);
  }

  protected async delete(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCronjobByCronjobId('' + entity.id);
    return await resource.backendActionCronjobDelete();
  }

  protected newEntity(): Cronjob {
    return {
      name: '',
      cron: '',
      action: ''
    };
  }

}
