import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {AxiosResponse} from "axios";
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

  protected async create(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().getBackendPage();
    return await group.backendActionPageCreate(entity);
  }

  protected async update(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().getBackendPageByPageId('' + entity.id);
    return await group.backendActionPageUpdate(entity);
  }

  protected async delete(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().getBackendPageByPageId('' + entity.id);
    return await group.backendActionPageDelete();
  }

  protected newEntity(): Page {
    return {
      status: 1,
      title: '',
      content: ''
    };
  }

}
