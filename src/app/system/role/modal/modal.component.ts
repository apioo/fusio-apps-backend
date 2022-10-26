import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-role-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Role> {

  categories?: Array<Category>;

  override async ngOnInit(): Promise<void> {
    const category = await this.fusio.getClient().getBackendCategory();
    const response = await category.backendActionCategoryGetAll({count: 1024});
    this.categories = response.data.entry;
  }

  protected async create(entity: Role): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRole();
    return await resource.backendActionRoleCreate(entity);
  }

  protected async update(entity: Role): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRoleByRoleId('' + entity.id);
    return await resource.backendActionRoleUpdate(entity);
  }

  protected async delete(entity: Role): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendRoleByRoleId('' + entity.id);
    return await resource.backendActionRoleDelete();
  }

  protected newEntity(): Role {
    return {
      name: ''
    };
  }

}
