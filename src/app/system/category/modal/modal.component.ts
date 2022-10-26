import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-category-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Category> {

  protected async create(entity: Category): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCategory();
    return await resource.backendActionCategoryCreate(entity);
  }

  protected async update(entity: Category): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCategoryByCategoryId('' + entity.id);
    return await resource.backendActionCategoryUpdate(entity);
  }

  protected async delete(entity: Category): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendCategoryByCategoryId('' + entity.id);
    return await resource.backendActionCategoryDelete();
  }

  protected newEntity(): Category {
    return {
      name: '',
    };
  }

}
