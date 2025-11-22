import {Component, OnInit} from '@angular/core';
import {ErrorService, FormMapComponent, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../api.service";
import {BackendConnection, BackendHttpRequest, BackendHttpResponse, CommonMessage} from "fusio-sdk";
import {ConnectionService} from "../../../services/connection.service";
import {KeyValuePipe, NgClass} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-connection-http',
  templateUrl: './http.component.html',
  imports: [
    NgClass,
    EditorComponent,
    FormsModule,
    KeyValuePipe,
    FormMapComponent,
    MessageComponent,
    RouterLink
  ],
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit {

  selectedConnection?: BackendConnection;

  method = 'GET';
  uri = '/';
  headers: Record<string, string> = {};
  body = '';

  message?: CommonMessage;
  response?: BackendHttpResponse;
  statusCode = 0;

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private router: Router, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = await this.connection.get(params['connection']);
      }
    });
  }

  async send() {
    if (!this.selectedConnection) {
      return;
    }

    const payload: BackendHttpRequest = {
      method: this.method,
      uri: this.uri,
      headers: this.headers,
      body: this.body
    };

    try {
      this.response = await this.api.getClient().backend().connection().http().execute('' + this.selectedConnection.id, payload)
      this.statusCode = this.response.statusCode || 0;
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

}
