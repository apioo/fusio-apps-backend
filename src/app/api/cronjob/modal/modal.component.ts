import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendCronjob} from "fusio-sdk/dist/BackendCronjob";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-cronjob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendCronjob> {

  protected async create(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().create(entity);
  }

  protected async update(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendCronjob): Promise<CommonMessage> {
    return this.fusio.getClient().backend().cronjob().delete('' + entity.id);
  }

  protected newEntity(): BackendCronjob {
    return {
      name: '',
      cron: '',
      action: ''
    };
  }

}
