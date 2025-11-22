import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {SchemaService} from "../../../services/schema.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendSchema> {

  renderedId?: number;
  preview?: string;
  loading: boolean = false;

  constructor(private service: SchemaService, private fusio: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  protected override async onLoad() {
    super.onLoad();

    this.loading = true;

    try {
      const schemaId = '' + this.selected()?.id;
      const response = await this.fusio.getClient().backend().schema().getPreview(schemaId);

      this.preview = response.preview;
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading = false;
  }

}
