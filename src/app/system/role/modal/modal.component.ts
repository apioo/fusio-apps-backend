import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-role-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Role> {

  categories?: Array<Category>;

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().category().getAll(0, 1024);
    this.categories = response.entry;
  }

  protected async create(entity: Role): Promise<Message> {
    return this.fusio.getClient().role().create(entity);
  }

  protected async update(entity: Role): Promise<Message> {
    return this.fusio.getClient().role().update('' + entity.id, entity);
  }

  protected async delete(entity: Role): Promise<Message> {
    return this.fusio.getClient().role().delete('' + entity.id);
  }

  protected newEntity(): Role {
    return {
      name: ''
    };
  }

}
