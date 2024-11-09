import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {
  BackendConnectionIndexEntry,
  BackendIdentity,
  BackendRole,
  Client,
  CommonFormContainer,
  CommonMessage
} from "fusio-sdk";

@Component({
  selector: 'app-identity-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendIdentity> {

  roles?: Array<BackendRole>;
  providers?: Array<BackendConnectionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;

  override async ngOnInit(): Promise<void> {
    this.loadRoles();
    this.loadProviders();
    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().create(entity);
  }

  protected async update(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendIdentity): Promise<CommonMessage> {
    return this.fusio.getClient().backend().identity().delete('' + entity.id);
  }

  protected newEntity(): BackendIdentity {
    return {
      name: '',
      icon: '',
      class: '',
      allowCreate: true
    };
  }

  async loadRoles() {
    const response = await this.fusio.getClient().backend().role().getAll(0, 1024);
    this.roles = response.entry;
  }

  async loadProviders() {
    const response = await this.fusio.getClient().backend().identity().getClasses();
    this.providers = response.providers;
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    this.form = await this.fusio.getClient().backend().identity().getForm(classString);

    const hasChanged = this.entityClass && this.entityClass !== this.entity.class;
    this.entityClass = this.entity.class;

    if (hasChanged) {
      this.entity.config = {};
    }
  }

}
