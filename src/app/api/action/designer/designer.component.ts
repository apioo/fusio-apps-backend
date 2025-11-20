import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {
  BackendAction,
  BackendActionExecuteRequest,
  BackendActionExecuteResponse,
  CommonFormContainer,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ConfigComponent} from "../../../shared/config/config.component";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {JsonPipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-action-designer',
  templateUrl: './designer.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    ConfigComponent,
    FormsModule,
    NgbPopover,
    EditorComponent,
    NgClass,
    JsonPipe
  ],
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  message?: CommonMessage;
  action?: BackendAction;
  form?: CommonFormContainer;
  request: BackendActionExecuteRequest = {
    method: 'GET',
    uriFragments: '',
    parameters: '',
    headers: '',
  };
  body: string = '';
  response?: BackendActionExecuteResponse;
  contentType?: string;

  constructor(private fusio: ApiService, private route: ActivatedRoute, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadAction(id);
      }
    });
  }

  async submit() {
    if (!this.action || !this.request) {
      return;
    }

    try {
      const request = Object.assign({}, this.request);
      if (this.body) {
        request.body = JSON.parse(this.body);
      }

      await this.fusio.getClient().backend().action().update('' + this.action.id, this.action);

      this.response = await this.fusio.getClient().backend().action().execute('' + this.action.id, request);
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

  async loadAction(id: string) {
    try {
      this.action = await this.fusio.getClient().backend().action().get(id);

      if (this.action.class) {
        this.loadConfig(this.action.class);
      }
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    this.form = await this.fusio.getClient().backend().action().getForm(classString);
  }

}
