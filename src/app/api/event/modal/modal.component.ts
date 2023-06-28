import { Component, OnInit } from '@angular/core';
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-event-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Event> {

  protected async create(entity: Event): Promise<Message> {
    return this.fusio.getClient().event().create(entity);
  }

  protected async update(entity: Event): Promise<Message> {
    return this.fusio.getClient().event().update('' + entity.id, entity);
  }

  protected async delete(entity: Event): Promise<Message> {
    return this.fusio.getClient().event().delete('' + entity.id);
  }

  protected newEntity(): Event {
    return {
      name: '',
      description: ''
    };
  }

}
