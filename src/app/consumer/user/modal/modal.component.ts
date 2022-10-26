import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {UserCreate} from "fusio-sdk/dist/src/generated/backend/UserCreate";
import {UserUpdate} from "fusio-sdk/dist/src/generated/backend/UserUpdate";

@Component({
  selector: 'app-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, UserCreate> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Disabled'
  }];

  roles?: Array<Role>;

  override async ngOnInit(): Promise<void> {
    const user = await this.fusio.getClient().getBackendRole();
    const response = await user.backendActionRoleGetAll({count: 1024});
    this.roles = response.data.entry;
  }

  protected async create(entity: UserCreate): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendUser();
    return await resource.backendActionUserCreate(entity);
  }

  protected async update(entity: UserUpdate): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendUserByUserId('' + entity.id);
    return await resource.backendActionUserUpdate(entity);
  }

  protected async delete(entity: User): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendUserByUserId('' + entity.id);
    return await resource.backendActionUserDelete();
  }

  protected newEntity(): UserCreate {
    return {
      status: 1,
      roleId: 0,
      name: '',
      email: '',
      password: '',
    };
  }

}
