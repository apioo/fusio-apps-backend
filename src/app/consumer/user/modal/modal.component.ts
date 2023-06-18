import {Component} from '@angular/core';
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
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
    const response = await this.fusio.getClient().role().getAll(0, 1024);
    this.roles = response.entry;
  }

  protected async create(entity: UserCreate): Promise<Message> {
    return this.fusio.getClient().user().create(entity);
  }

  protected async update(entity: UserUpdate): Promise<Message> {
    return this.fusio.getClient().user().update('' + entity.id, entity);
  }

  protected async delete(entity: User): Promise<Message> {
    return this.fusio.getClient().user().delete('' + entity.id);
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
