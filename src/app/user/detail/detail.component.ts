import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";
import {User_Create} from "fusio-sdk/dist/src/generated/backend/User_Create";
import {User_Update} from "fusio-sdk/dist/src/generated/backend/User_Update";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<User> {

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

  protected newEntity(): User {
    return {
      status: 1,
      roleId: 0,
      name: '',
      email: ''
    };
  }

}
