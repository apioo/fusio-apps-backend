import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk";
import {EventService} from "../../../services/event.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {SchemaLinkComponent} from "../../../shared/schema-link/schema-link.component";

@Component({
  selector: 'app-event-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    SchemaLinkComponent
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendEvent> {

  constructor(private service: EventService, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): EventService {
    return this.service;
  }

}
