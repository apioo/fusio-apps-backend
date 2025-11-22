import {Component, signal} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SchemaService} from "../../../services/schema.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {ExportService, ImportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";

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
    TypeschemaEditorModule
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendSchema> {

  spec = signal<Specification|undefined>(undefined);

  constructor(private service: SchemaService, private importService: ImportService, private exportService: ExportService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    const source = this.entity()?.source;
    if (source) {
      this.spec.set(await this.importService.transform('typeschema', JSON.stringify(source)));
    } else {
      this.spec.set({
        imports: [],
        operations: [],
        types: []
      })
    }
  }

  protected override beforeCreate(entity: BackendSchema): BackendSchema {
    const spec = this.spec();
    if (spec) {
      entity.source = this.exportService.transform(spec);
    }

    return entity;
  }

  protected override beforeUpdate(entity: BackendSchema): BackendSchema {
    const spec = this.spec();
    if (spec) {
      entity.source = this.exportService.transform(spec);
    }

    return entity;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
