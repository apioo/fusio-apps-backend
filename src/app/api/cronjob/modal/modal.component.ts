import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-cronjob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Cronjob> {

  actions?: Array<Action>;

  override async ngOnInit(): Promise<void> {
    const action = await this.factory.getClient().backendAction();
    const response = await action.getBackendAction().backendActionActionGetAll({count: 1024});
    this.actions = response.data.entry;
  }

  protected async create(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCronjob();
    return await group.getBackendCronjob().backendActionCronjobCreate(entity);
  }

  protected async update(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCronjob();
    return await group.getBackendCronjobByCronjobId('' + entity.id).backendActionCronjobUpdate(entity);
  }

  protected async delete(entity: Cronjob): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendCronjob();
    return await group.getBackendCronjobByCronjobId('' + entity.id).backendActionCronjobDelete();
  }

  protected newEntity(): Cronjob {
    return {
      name: '',
      cron: '',
      action: ''
    };
  }

}
