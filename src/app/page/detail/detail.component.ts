import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Page> {

  protected async create(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPage();
    return await group.getBackendPage().backendActionPageCreate(entity);
  }

  protected async update(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPage();
    return await group.getBackendPageByPageId('' + entity.id).backendActionPageUpdate(entity);
  }

  protected async delete(entity: Page): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendPage();
    return await group.getBackendPageByPageId('' + entity.id).backendActionPageDelete();
  }

  protected newEntity(): Page {
    return {
      status: 1,
      title: '',
      content: ''
    };
  }

}
