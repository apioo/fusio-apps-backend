import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {ConnectionService} from "../../../../services/connection.service";
import {BackendAction, BackendActionExecuteResponse, BackendConnection, BackendSchema, CommonMessage} from "fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";
import {HttpClient} from "@angular/common/http";
import {JsonPipe, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MarkdownComponent} from "ngx-markdown";
import {Highlight} from "ngx-highlightjs";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {Response} from "../../../action/designer/response/response";

@Component({
  selector: 'app-connection-agent',
  templateUrl: './agent.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    TypeschemaEditorModule,
    JsonPipe,
    FormsModule,
    EditorComponent,
    Response,
    MarkdownComponent,
    NgClass,
    Highlight
  ],
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  options = {
    headers: {
      Authorization: 'Bearer '
    },
    params: {
      intent: ''
    }
  };

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  intent = signal<string>('general');
  messages = signal<Array<any>>([]);
  input = signal<string>('');
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  action = signal<BackendAction|undefined>(undefined);
  code = signal<string>('');
  actionResponse = signal<BackendActionExecuteResponse|undefined>(undefined);
  actionLoading = signal<boolean>(false);

  schema = signal<BackendSchema|undefined>(undefined);

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private error: ErrorService, private httpClient: HttpClient) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['intent'] === 'action' || params['intent'] === 'schema') {
        this.intent.set(params['intent']);
      } else {
        this.intent.set('');
      }

      if (params['connection']) {
        const connection = await this.connection.get(params['connection']);
        if (connection) {
          try {
            this.selectedConnection.set(connection);
            this.load();
          } catch (error) {
            this.response.set(this.error.convert(error));
          }
        }
      }
    });
  }

  doSend() {
    const message = this.input();
    if (!message) {
      return;
    }

    const intent = this.intent();

    const body = {
      intent: intent,
      input: {
        type: 'text',
        content: message,
      }
    };

    this.messages.update((messages) => {
      messages.push({
        origin: 1,
        message: {
          type: 'text',
          content: message,
        },
      });
      return messages;
    });

    this.loading.set(true);

    this.httpClient.post<any>(this.api.getBaseUrl() + '/backend/connection/' + this.selectedConnection()?.id + '/agent', body, this.options).subscribe({
      next: (response) => {
        this.loading.set(false);

        if (intent === 'action') {
          const action = this.parseJsonResponse<BackendAction>(response.output);
          if (action) {
            this.loadAction(action);
          }
        } else if (intent === 'schema') {
          const schema = this.parseJsonResponse<BackendSchema>(response.output);
          if (schema) {
            this.loadSchema(schema);
          }
        }

        this.messages.update((messages) => {
          messages.push({
            origin: 2,
            message: response.output,
          });
          return messages;
        });

        this.scrollToBottom();
      },
      error: (err) => {
        this.loading.set(false);
        this.response.set(this.error.convert(err));
      }
    });

    this.input.set('');
  }

  load() {
    const options = this.options;
    options.params = {
      intent: this.intent()
    }

    this.httpClient.get<any>(this.api.getBaseUrl() + '/backend/connection/' + this.selectedConnection()?.id + '/agent', options).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.messages.set(response.entry || []);

        this.scrollToBottom();
      },
      error: (err) => {
        this.loading.set(false);
        this.response.set(this.error.convert(err));
      }
    });
  }

  doReset() {
    this.httpClient.delete<any>(this.api.getBaseUrl() + '/backend/connection/' + this.selectedConnection()?.id + '/agent', this.options).subscribe({
      next: (response) => {
        this.loading.set(false);
        this.response.set(response);
        this.resetAction();
        this.resetSchema();
        this.load();
      },
      error: (err) => {
        this.loading.set(false);
        this.response.set(this.error.convert(err));
        this.resetAction();
        this.resetSchema();
        this.load();
      }
    });
  }

  scrollToBottom(): void {
    window.setTimeout(() => {
      let messagesBottom = document.getElementById('messages-bottom');
      if (messagesBottom !== null) {
        messagesBottom.scrollIntoView();
      }
    }, 500);
  }

  loadAction(action: BackendAction) {
    this.action.set(action);

    if (action.config) {
      const code = action.config['code'];
      if (typeof code === 'string') {
        this.code.set(code);
      }
    }
  }

  async executeAction() {
    const action = this.action();
    if (!action) {
      return;
    }

    const code = this.code();
    if (!code) {
      return;
    }

    const name = action.name;
    if (!name) {
      return;
    }

    this.actionLoading.set(true);

    try {
      let existing: BackendAction|undefined = undefined;
      try {
        existing = await this.api.getClient().backend().action().get('~' + name);
      } catch (error) {
        // action does not exist
      }

      let response: CommonMessage;
      if (existing) {
        if (!existing.config) {
          existing.config = {};
        }

        existing.config['code'] = code;

        response = await this.api.getClient().backend().action().update('' + existing.id, existing);
      } else {
        response = await this.api.getClient().backend().action().create(action);
      }

      this.actionResponse.set(await this.api.getClient().backend().action().execute('' + response.id, {}));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.actionLoading.set(false);
  }

  resetAction() {
    this.action.set(undefined);
    this.code.set('');
    this.actionResponse.set(undefined);
    this.actionLoading.set(false);
  }

  loadSchema(schema: BackendSchema) {
    this.schema.set(schema);
  }

  resetSchema() {
    this.schema.set(undefined);
  }

  private parseJsonResponse<T>(output: any): T|undefined {
    if (output.type === 'object' && typeof output.payload === 'object') {
      return output.payload;
    }

    return undefined;
  }

  submit() {

  }

}
