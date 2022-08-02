import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "../../../modal";

@Component({
  selector: 'app-role-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Role> {

  categories?: Array<Category>;

  override async ngOnInit(): Promise<void> {
    const category = await this.factory.getClient().backendCategory();
    const response = await category.getBackendCategory().backendActionCategoryGetAll({count: 1024});
    this.categories = response.data.entry;
  }

  protected async create(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRole().backendActionRoleCreate(entity);
  }

  protected async update(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRoleByRoleId('' + entity.id).backendActionRoleUpdate(entity);
  }

  protected async delete(entity: Role): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendRole();
    return await group.getBackendRoleByRoleId('' + entity.id).backendActionRoleDelete();
  }

  protected newEntity(): Role {
    return {
      name: ''
    };
  }

}
