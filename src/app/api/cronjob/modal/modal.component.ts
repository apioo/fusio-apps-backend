import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-cronjob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Cronjob> {

  protected async create(entity: Cronjob): Promise<Message> {
    return this.fusio.getClient().cronjob().create(entity);
  }

  protected async update(entity: Cronjob): Promise<Message> {
    return this.fusio.getClient().cronjob().update('' + entity.id, entity);
  }

  protected async delete(entity: Cronjob): Promise<Message> {
    return this.fusio.getClient().cronjob().delete('' + entity.id);
  }

  protected newEntity(): Cronjob {
    return {
      name: '',
      cron: '',
      action: ''
    };
  }

}
