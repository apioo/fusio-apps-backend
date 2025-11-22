import {Component, signal} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {SchemaService} from "../../../services/schema.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ExportService, ImportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    TypeschemaEditorModule
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendSchema> {

  spec = signal<Specification>({
    imports: [],
    operations: [],
    types: []
  });

  constructor(private service: SchemaService, private importService: ImportService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  protected override async onLoad() {
    super.onLoad();

    try {
      const source = this.selected()?.source;
      if (source) {
        const spec = await this.importService.transform('typeschema', JSON.stringify(source))

        this.spec.set(spec);
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
