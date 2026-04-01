import {Component} from '@angular/core';
import {LogComponent} from "../log/log.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Detail, ErrorService, MessageComponent, ScopesComponent} from "ngx-fusio-sdk";
import {BackendOperation} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OperationService} from "../../../services/operation.service";
import {SchemaLinkComponent} from "../../../shared/schema-link/schema-link.component";
import {ActionLinkComponent} from "../../../shared/action-link/action-link.component";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe, KeyValuePipe} from "@angular/common";
import {OperationStatus} from "../../../shared/operation-status/operation-status";

@Component({
  selector: 'app-operation-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    ScopesComponent,
    SchemaLinkComponent,
    ActionLinkComponent,
    EditorComponent,
    FormsModule,
    JsonPipe,
    KeyValuePipe,
    OperationStatus
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendOperation> {

  public baseUrl: string = '';

  constructor(private service: OperationService, private fusio: ApiService, private modal: NgbModal, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): OperationService {
    return this.service;
  }

  override async onLoad(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
  }

  showLogs() {
    if (!this.selected) {
      return;
    }

    const modalRef = this.modal.open(LogComponent, {
      size: 'xl'
    });
    modalRef.componentInstance.operation = this.selected;
  }

}
