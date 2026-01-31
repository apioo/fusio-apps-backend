import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {ConnectionService} from "../../../../services/connection.service";
import {
  BackendAction, BackendActionExecuteResponse,
  BackendActionExecuteResponseBody, BackendConnection, BackendSchema, CommonMessage
} from "fusio-sdk";
import {ImportService, Specification, TypeschemaEditorModule} from "ngx-typeschema-editor";
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

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  intent = signal<string>('general');
  messages = signal<Array<any>>([]);
  input = signal<string>('');
  loading = signal<boolean>(false);
  response = signal<CommonMessage|undefined>(undefined);

  action = signal<BackendAction|undefined>(undefined);
  actionResponse = signal<BackendActionExecuteResponse|undefined>(undefined);
  actionLoading = signal<boolean>(false);
  code = signal<string>('');

  schema = signal<BackendSchema|undefined>(undefined);
  schemaLoading = signal<boolean>(false);
  spec = signal<Specification>({
    imports: [],
    operations: [],
    types: []
  });

  constructor(private api: ApiService, private connection: ConnectionService, private importService: ImportService, private route: ActivatedRoute, private error: ErrorService, private httpClient: HttpClient) {
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

  async doSend() {
    const message = this.input();
    if (!message) {
      return;
    }

    const intent = this.intent();

    const connectionId = this.selectedConnection()?.id;
    if (!connectionId) {
      return;
    }

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

    this.input.set('');
    this.loading.set(true);

    try {
      const response = await this.api.getClient().backend().connection().agent().send('' + connectionId, {
        intent: intent,
        input: {
          type: 'text',
          content: message,
        }
      });

      const output = response.output;
      if (output) {
        if (intent === 'action') {
          if (output.type === 'text' && output.content) {
            this.loadAction(output.content);
          }
        } else if (intent === 'schema') {
          if (output.type === 'object' && output.payload) {
            await this.loadSchema(output.payload);
          }
        }

        this.messages.update((messages) => {
          messages.push({
            origin: 2,
            message: output,
          });
          return messages;
        });

        this.scrollToBottom();
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
    this.actionResponse.set(undefined);
    this.actionLoading.set(false);
  }

  async load() {
    const intent = this.intent();

    const connectionId = this.selectedConnection()?.id;
    if (!connectionId) {
      return;
    }

    try {
      const collection = await this.api.getClient().backend().connection().agent().get('' + connectionId, intent);

      this.loading.set(false);
      this.messages.set(collection.entry || []);

      this.scrollToBottom();
    } catch (error) {
      this.loading.set(false);
      this.response.set(this.error.convert(error));
    }
  }

  async doReset() {
    const connectionId = this.selectedConnection()?.id;
    if (!connectionId) {
      return;
    }

    try {
      const response = await this.api.getClient().backend().connection().agent().reset('' + connectionId);

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.loading.set(false);
    this.resetAction();
    this.resetSchema();
    this.load();
  }

  scrollToBottom(): void {
    window.setTimeout(() => {
      let messagesBottom = document.getElementById('messages-bottom');
      if (messagesBottom !== null) {
        messagesBottom.scrollIntoView();
      }
    }, 500);
  }

  loadAction(content: string) {
    const name = this.extractName(content);
    const code = this.extractCode(content);

    const action: BackendAction = {
      name: name,
      class: 'Fusio.Adapter.Worker.Action.WorkerPHPLocal',
      config: {
        code: code
      },
    };

    this.action.set(action);
    this.code.set(code);
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
    this.actionResponse.set(undefined);
    this.actionLoading.set(false);
    this.code.set('');
  }

  async loadSchema(schema: BackendSchema) {
    this.schema.set(schema);

    if (schema.source) {
      const spec = await this.importService.transform('typeschema', JSON.stringify(schema.source))

      this.spec.set(spec);
    }
  }

  async saveSchema() {
    const schema = this.schema();
    if (!schema) {
      return;
    }

    const name = schema.name;
    if (!name) {
      return;
    }

    this.schemaLoading.set(true);

    try {
      let existing: BackendSchema|undefined = undefined;
      try {
        existing = await this.api.getClient().backend().schema().get('~' + name);
      } catch (error) {
        // action does not exist
      }

      let response: CommonMessage;
      if (existing) {
        response = await this.api.getClient().backend().schema().update('' + existing.id, existing);
      } else {
        response = await this.api.getClient().backend().schema().create(schema);
      }

      this.response.set(response);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.schemaLoading.set(false);
  }

  resetSchema() {
    this.schema.set(undefined);
    this.schemaLoading.set(false);
    this.spec.set({
      imports: [],
      operations: [],
      types: []
    });
  }

  private extractName(content: string): string {
    const result = content.match(/Action: ([A-Za-z0-9-]+)/im);
    if (!result) {
      return '';
    }

    return result[1] || '';
  }

  private extractCode(content: string): string {
    let captured = false;
    let code = '';

    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '<?php') {
        captured = true;
      }

      if (captured) {
        code+= line + "\n";
      }

      if (line === '};') {
        break;
      }
    }

    return code;
  }

  getErrorMessage(response: BackendActionExecuteResponseBody): string|null {
    if (response['success'] === false && response['title'] && response['message']) {
      let message = 'Try to fix the following error:' + "\n";
      message+= 'Error: ' + response['title'] + "\n";
      message+= 'Message: ' + response['message'] + "\n";
      return message;
    }

    return null;
  }

}
