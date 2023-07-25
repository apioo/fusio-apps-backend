import { Component, OnInit } from '@angular/core';
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {Identity} from "fusio-sdk/dist/src/generated/backend/Identity";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {ConnectionIndexEntry} from "fusio-sdk/dist/src/generated/backend/ConnectionIndexEntry";

@Component({
  selector: 'app-identity-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Identity> {

  roles?: Array<Role>;
  providers?: Array<ConnectionIndexEntry>;
  form?: FormContainer;
  entityClass?: string;

  override async ngOnInit(): Promise<void> {
    this.loadRoles();
    this.loadProviders();
    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: Identity): Promise<Message> {
    return this.fusio.getClient().identity().create(entity);
  }

  protected async update(entity: Identity): Promise<Message> {
    return this.fusio.getClient().identity().update('' + entity.id, entity);
  }

  protected async delete(entity: Identity): Promise<Message> {
    return this.fusio.getClient().identity().delete('' + entity.id);
  }

  protected newEntity(): Identity {
    return {
      name: '',
      icon: '',
      class: '',
      allowCreate: true
    };
  }

  async loadRoles() {
    const response = await this.fusio.getClient().role().getAll(0, 1024);
    this.roles = response.entry;
  }

  async loadProviders() {
    const response = await this.fusio.getClient().identity().getClasses();
    this.providers = response.providers;
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    this.form = await this.fusio.getClient().identity().getForm(classString);

    const hasChanged = this.entityClass && this.entityClass !== this.entity.class;
    this.entityClass = this.entity.class;

    if (hasChanged) {
      this.entity.config = {};
    }
  }

}
