import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendPage, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-page-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendPage> {

  status = [{
    key: 1,
    value: 'Visible'
  }, {
    key: 2,
    value: 'Hidden'
  }];

  protected async create(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().create(entity);
  }

  protected async update(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendPage): Promise<CommonMessage> {
    return this.fusio.getClient().backend().page().delete('' + entity.id);
  }

  protected newEntity(): BackendPage {
    return {
      status: 1,
      title: '',
      content: ''
    };
  }

}
