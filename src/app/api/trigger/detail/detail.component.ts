import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-trigger-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    ActionLinkComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTrigger> {

  constructor(private service: TriggerService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

}
