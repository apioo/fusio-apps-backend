import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent, ScopesComponent} from "ngx-fusio-sdk";
import {BackendApp} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../services/app.service";
import {ClipboardModule} from "ngx-clipboard";
import {DatePipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    ClipboardModule,
    ScopesComponent,
    DatePipe,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendApp> {

  hideSecret = true;

  constructor(private service: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.service;
  }

}
