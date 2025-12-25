import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendConnectionIndexEntry, BackendIdentity, CommonFormContainer} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";
import {AppService} from "../../../services/app.service";
import {RoleService} from "../../../services/role.service";
import {ApiService} from "../../../api.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ConfigComponent} from "../../../shared/config/config.component";
import {IconProvider} from "../../../icon-provider";

@Component({
    selector: 'app-identity-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormAutocompleteComponent,
    FormsModule,
    NgbPopover,
    ConfigComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendIdentity> {

  providers?: Array<BackendConnectionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;
  icons = IconProvider.icons;

  constructor(private service: IdentityService, private fusio: ApiService, private help: HelpService, public role: RoleService, public app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): IdentityService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    this.loadProviders();
    this.loadConfig(this.entity().class);
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

    const hasChanged = this.entityClass && this.entityClass !== this.entity().class;
    this.entityClass = this.entity().class;

    if (hasChanged) {
      this.set(this.entity, 'config', {});
    }
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
