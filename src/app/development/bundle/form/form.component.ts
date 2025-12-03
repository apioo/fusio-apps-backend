import {Component} from '@angular/core';
import {ErrorService, Form, FormListComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendBundle} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {BundleService} from "../../../services/bundle.service";
import {ActionService} from "../../../services/action.service";
import {SchemaService} from "../../../services/schema.service";
import {EventService} from "../../../services/event.service";
import {CronjobService} from "../../../services/cronjob.service";
import {TriggerService} from "../../../services/trigger.service";

@Component({
  selector: 'app-bundle-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormListComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendBundle> {

  constructor(private service: BundleService, private help: HelpService, public action: ActionService, public schema: SchemaService, public event: EventService, public cronjob: CronjobService, public trigger: TriggerService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): BundleService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  getEntries(type: string) {
    const config = this.entity().config
    if (config === undefined) {
      return [];
    }

    return config[type] || [];
  }

  setEntries(type: string, entries: Array<string>) {
    this.entity.update((entity) => {
      if (entity.config === undefined) {
        entity.config = {};
      }
      entity.config[type] = entries;
      return entity;
    })
  }

}
