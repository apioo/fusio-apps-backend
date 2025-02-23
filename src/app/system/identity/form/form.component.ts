import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendConnectionIndexEntry, BackendIdentity, BackendRole, CommonFormContainer} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";
import {AppService} from "../../../services/app.service";
import {RoleService} from "../../../services/role.service";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-identity-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendIdentity> {

  providers?: Array<BackendConnectionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;

  constructor(private service: IdentityService, private fusio: ApiService, public role: RoleService, public app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): IdentityService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    this.loadProviders();
    this.loadConfig(this.entity?.class);
  }

  async loadProviders() {
    const response = await this.fusio.getClient().backend().identity().getClasses();
    this.providers = response.providers;
  }

  async loadConfig(classString?: string) {
    if (!classString || !this.entity) {
      return;
    }

    this.form = await this.fusio.getClient().backend().identity().getForm(classString);

    const hasChanged = this.entityClass && this.entityClass !== this.entity.class;
    this.entityClass = this.entity.class;

    if (hasChanged) {
      this.entity.config = {};
    }
  }

  protected readonly parseInt = parseInt;
}
