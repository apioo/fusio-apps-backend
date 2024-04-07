import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendEvent} from "fusio-sdk/dist/BackendEvent";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendEvent> {

  protected async create(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().create(entity);
  }

  protected async update(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendEvent): Promise<CommonMessage> {
    return this.fusio.getClient().backend().event().delete('' + entity.id);
  }

  protected newEntity(): BackendEvent {
    return {
      name: '',
      description: ''
    };
  }

}
