import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ActionSelectorComponent} from "../../../shared/action-selector/action-selector.component";
import {AgentService} from "../../../services/agent.service";
import {SchemaSelectorComponent} from "../../../shared/schema-selector/schema-selector.component";
import {ConnectionService} from "../../../services/connection.service";

@Component({
  selector: 'app-agent-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    ActionSelectorComponent,
    SchemaSelectorComponent,
    FormAutocompleteComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAgent> {

  constructor(private service: AgentService, private help: HelpService, public connection: ConnectionService, public event: EventService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AgentService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
