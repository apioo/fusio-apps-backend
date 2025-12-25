import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, FormMapComponent, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {BackendConnection, BackendHttpRequest, BackendHttpResponse, CommonMessage} from "fusio-sdk";
import {ConnectionService} from "../../../../services/connection.service";
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

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  loading = signal<boolean>(false);
  method = signal<string>('GET');
  uri = signal<string>('/');
  headers = signal<Record<string, string>>({});
  body = signal<string>('');

  message = signal<CommonMessage|undefined>(undefined);
  response = signal<BackendHttpResponse|undefined>(undefined);
  statusCode = signal<number>(0);

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection.set(await this.connection.get(params['connection']));
      }
    });
  }

  async send() {
    const connection = this.selectedConnection();
    if (!connection) {
      return;
    }

    const payload: BackendHttpRequest = {
      method: this.method(),
      uri: this.uri(),
      headers: this.headers(),
      body: this.body()
    };

    this.loading.set(true);

    try {
      const response = await this.api.getClient().backend().connection().http().execute('' + connection.id, payload);

      this.response.set(response);
      this.statusCode.set(response.statusCode || 0);
    } catch (error) {
      this.message.set(this.error.convert(error));
    }

    this.loading.set(false);
  }

}
