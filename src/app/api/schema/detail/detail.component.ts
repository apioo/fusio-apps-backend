import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {SchemaService} from "../../../services/schema.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-schema-detail',
  templateUrl: './detail.component.html',
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

  protected override onLoad() {
    super.onLoad();

    this.loading = true;
    this.renderPreview('' + this.selected?.id);
  }

  private async renderPreview(id: string) {
    const response = await this.fusio.getClient().backend().schema().getPreview(id);

    this.preview = response.preview;
    this.loading = false;
  }

}
