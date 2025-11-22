import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SchemaService} from "../../../services/schema.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";

@Component({
    selector: 'app-schema-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    RouterLink,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    EditorComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendSchema> {

  schema: string = '';

  constructor(private service: SchemaService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  override onLoad(): void {
    const source = this.entity().source;
    if (source) {
      this.schema = JSON.stringify(source, null, 2);
    }
  }

  protected override beforeCreate(entity: BackendSchema): BackendSchema {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return entity;
  }

  protected override beforeUpdate(entity: BackendSchema): BackendSchema {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return entity;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
