import { Component, OnInit } from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {BackendSchema, Client, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-schema-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendSchema> {

  schema: string = '';

  override ngOnInit(): void {
    if (this.entity && this.entity.source) {
      this.schema = JSON.stringify(this.entity.source, null, 2);
    }
  }

  protected async create(entity: BackendSchema): Promise<CommonMessage> {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return this.fusio.getClient().backend().schema().create(entity);
  }

  protected async update(entity: BackendSchema): Promise<CommonMessage> {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return this.fusio.getClient().backend().schema().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendSchema): Promise<CommonMessage> {
    return this.fusio.getClient().backend().schema().delete('' + entity.id);
  }

  protected newEntity(): BackendSchema {
    return {
      name: ''
    };
  }

}
