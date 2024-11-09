import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendCategory, BackendRole, Client, CommonMessage} from "fusio-sdk";

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
