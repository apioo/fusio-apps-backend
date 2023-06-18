import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-page-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Page> {

  status = [{
    key: 1,
    value: 'Visible'
  }, {
    key: 2,
    value: 'Hidden'
  }];

  protected async create(entity: Page): Promise<Message> {
    return this.fusio.getClient().page().create(entity);
  }

  protected async update(entity: Page): Promise<Message> {
    return this.fusio.getClient().page().update('' + entity.id, entity);
  }

  protected async delete(entity: Page): Promise<Message> {
    return this.fusio.getClient().page().delete('' + entity.id);
  }

  protected newEntity(): Page {
    return {
      status: 1,
      title: '',
      content: ''
    };
  }

}
