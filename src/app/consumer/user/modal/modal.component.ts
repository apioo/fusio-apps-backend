import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendRole, BackendUser, BackendUserCreate, BackendUserUpdate, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-user-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendUserCreate> {

  status = [{
    key: 1,
    value: 'Active'
  }, {
    key: 2,
    value: 'Disabled'
  }];

  roles?: Array<BackendRole>;

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().role().getAll(0, 1024);
    this.roles = response.entry;
  }

  protected async create(entity: BackendUserCreate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().create(entity);
  }

  protected async update(entity: BackendUserUpdate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendUser): Promise<CommonMessage> {
    return this.fusio.getClient().backend().user().delete('' + entity.id);
  }

  protected newEntity(): BackendUserCreate {
    return {
      status: 1,
      roleId: 0,
      name: '',
      email: '',
      password: '',
    };
  }

}
