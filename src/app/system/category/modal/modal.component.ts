import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-category-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Category> {

  protected async create(entity: Category): Promise<Message> {
    return this.fusio.getClient().category().create(entity);
  }

  protected async update(entity: Category): Promise<Message> {
    return this.fusio.getClient().category().update('' + entity.id, entity);
  }

  protected async delete(entity: Category): Promise<Message> {
    return this.fusio.getClient().category().delete('' + entity.id);
  }

  protected newEntity(): Category {
    return {
      name: '',
    };
  }

}
