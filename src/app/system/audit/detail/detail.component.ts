import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendAudit} from "fusio-sdk";
import {AuditService} from "../../../services/audit.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {DatePipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-audit-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    DatePipe,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAudit> {

  constructor(private service: AuditService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AuditService {
    return this.service;
  }

}
