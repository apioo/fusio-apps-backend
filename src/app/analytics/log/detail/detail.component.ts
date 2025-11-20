import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk";
import {LogService} from "../../../services/log.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, JsonPipe} from "@angular/common";
import {ErrorDetailsComponent} from "../../../shared/error-details/error-details.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-log-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    DatePipe,
    JsonPipe,
    ErrorDetailsComponent,
    EditorComponent,
    FormsModule
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendLog> {

  constructor(private service: LogService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): LogService {
    return this.service;
  }

}
