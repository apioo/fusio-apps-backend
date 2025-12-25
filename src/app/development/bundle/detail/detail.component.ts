import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {BundleService} from "../../../services/bundle.service";
import {BackendBundle} from "fusio-sdk";

@Component({
  selector: 'app-bundle-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendBundle> {

  constructor(private service: BundleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): BundleService {
    return this.service;
  }

  async doPublish(id?: number) {
    if (id === undefined) {
      return;
    }

    try {
      this.response.set(await this.service.publish('' + id));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
