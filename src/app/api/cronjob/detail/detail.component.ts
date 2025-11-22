import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendCronjob} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CronjobService} from "../../../services/cronjob.service";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {ErrorDetailsComponent} from "../../../shared/error-details/error-details.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {DatePipe, JsonPipe} from "@angular/common";

@Component({
  selector: 'app-cronjob-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    ActionLinkComponent,
    ErrorDetailsComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    DatePipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendCronjob> {

  constructor(private service: CronjobService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CronjobService {
    return this.service;
  }

}
