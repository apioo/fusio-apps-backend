import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendCategory, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-category-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendCategory> {

  protected async create(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().create(entity);
  }

  protected async update(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendCategory): Promise<CommonMessage> {
    return this.fusio.getClient().backend().category().delete('' + entity.id);
  }

  protected newEntity(): BackendCategory {
    return {
      name: '',
    };
  }

}
