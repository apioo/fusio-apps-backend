import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAgent} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {EditorComponent} from "ngx-monaco-editor-v2-alternative";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {AgentService} from "../../../services/agent.service";
import {SchemaLinkComponent} from "../../../shared/schema-link/schema-link.component";

@Component({
  selector: 'app-agent-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    ActionLinkComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    SchemaLinkComponent
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAgent> {

  constructor(private service: AgentService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AgentService {
    return this.service;
  }

}
