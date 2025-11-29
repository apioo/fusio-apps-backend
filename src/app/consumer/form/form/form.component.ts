import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendForm} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../../services/form.service";
import {OperationService} from "../../../services/operation.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";

@Component({
  selector: 'app-form-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent,
    EditorComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendForm> {

  uiSchema?: string;

  constructor(private service: FormService, private help: HelpService, public operation: OperationService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FormService {
    return this.service;
  }

  protected override onLoad() {
    const uiSchema = this.entity().uiSchema;
    if (uiSchema) {
      this.uiSchema = JSON.stringify(uiSchema, null, 2);
    }
  }

  protected override beforeCreate(entity: BackendForm): BackendForm {
    if (this.uiSchema) {
      entity.uiSchema = JSON.parse(this.uiSchema);
    }

    return entity;
  }

  protected override beforeUpdate(entity: BackendForm): BackendForm {
    if (this.uiSchema) {
      entity.uiSchema = JSON.parse(this.uiSchema);
    }

    return entity;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
