import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendOperation} from "fusio-sdk";
import {OperationService} from "../../../services/operation.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SchemaService} from "../../../services/schema.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {TagEditorComponent} from "../../../shared/tag-editor/tag-editor.component";
import {OperationParametersComponent} from "../../../shared/operation-parameters/operation-parameters.component";
import {SchemaSelectorComponent} from "../../../shared/schema-selector/schema-selector.component";
import {OperationThrowsComponent} from "../../../shared/operation-throws/operation-throws.component";
import {ActionSelectorComponent} from "../../../shared/action-selector/action-selector.component";

@Component({
  selector: 'app-operation-modal',
  templateUrl: './form.component.html',
  imports: [
    RouterLink,
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    TagEditorComponent,
    OperationParametersComponent,
    SchemaSelectorComponent,
    OperationThrowsComponent,
    ActionSelectorComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendOperation> {

  stabilities = [
    {key: 0, value: 'Deprecated'},
    {key: 1, value: 'Experimental'},
    {key: 2, value: 'Stable'},
    {key: 3, value: 'Legacy'}
  ]

  methods = [
    {key: 'GET', value: 'GET'},
    {key: 'POST', value: 'POST'},
    {key: 'PUT', value: 'PUT'},
    {key: 'PATCH', value: 'PATCH'},
    {key: 'DELETE', value: 'DELETE'}
  ]

  successStatusCodes = [
    {key: 200, value: 'OK'},
    {key: 201, value: 'Created'},
    {key: 202, value: 'Accepted'},
    {key: 204, value: 'No Content'},
    {key: 205, value: 'Reset Content'},
  ]

  constructor(private service: OperationService, private help: HelpService, public action: ActionService, public schema: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): OperationService {
    return this.service;
  }

  public isDisabled(): boolean {
    if (!this.entity) {
      return false;
    }

    return this.mode === 3 || (this.entity().stability === 2 || this.entity().stability === 3);
  }

  changeHttpMethod(): void {
    if (this.entity && this.entity().incoming && (this.entity().httpMethod === 'GET' || this.entity().httpMethod === 'DELETE')) {
      delete this.entity().incoming;
    }
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
