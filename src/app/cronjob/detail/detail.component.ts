import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Cronjob} from "fusio-sdk/src/generated/backend/Cronjob";
import {Action} from "fusio-sdk/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-cronjob-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Cronjob> {

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
