import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendRole} from "fusio-sdk/dist/BackendRole";
import {Client} from "fusio-sdk/dist/Client";
import {BackendCategory} from "fusio-sdk/dist/BackendCategory";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-role-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendRole> {

  categories?: Array<BackendCategory>;

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().category().getAll(0, 1024);
    this.categories = response.entry;
  }

  protected async create(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().create(entity);
  }

  protected async update(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendRole): Promise<CommonMessage> {
    return this.fusio.getClient().backend().role().delete('' + entity.id);
  }

  protected newEntity(): BackendRole {
    return {
      name: ''
    };
  }

}
