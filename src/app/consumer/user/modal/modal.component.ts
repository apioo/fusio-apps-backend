import {Component} from '@angular/core';
import {User_Create} from "fusio-sdk/dist/src/generated/backend/User_Create";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {User_Update} from "fusio-sdk/dist/src/generated/backend/User_Update";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Modal} from "../../../modal";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";

@Component({
  selector: 'app-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<User_Create> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Disabled'
  }];

  roles?: Array<Role>;

  override async ngOnInit(): Promise<void> {
    const user = await this.factory.getClient().backendRole();
    const response = await user.getBackendRole().backendActionRoleGetAll({count: 1024});
    this.roles = response.data.entry;
  }

  protected async create(entity: User_Create): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendUser();
    return await group.getBackendUser().backendActionUserCreate(entity);
  }

  protected async update(entity: User_Update): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendUser();
    return await group.getBackendUserByUserId('' + entity.id).backendActionUserUpdate(entity);
  }

  protected async delete(entity: User): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendUser();
    return await group.getBackendUserByUserId('' + entity.id).backendActionUserDelete();
  }

  protected newEntity(): User_Create {
    return {
      status: 1,
      roleId: 0,
      name: '',
      email: '',
      password: '',
    };
  }

}
