import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {SchemaService} from "../../../services/schema.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {SchemaSelectorComponent} from "../../../shared/schema-selector/schema-selector.component";

@Component({
    selector: 'app-event-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    RouterLink,
    FormButtons,
    FormsModule,
    NgbPopover,
    SchemaSelectorComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendEvent> {

  constructor(private service: EventService, private help: HelpService, public schema: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): EventService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
