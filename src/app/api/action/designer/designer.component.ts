import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {
  BackendAction,
  BackendActionConfig,
  BackendActionExecuteRequest,
  BackendActionExecuteResponse,
  CommonFormContainer,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ConfigComponent} from "../../../shared/config/config.component";
import {FormsModule} from "@angular/forms";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {JsonPipe, NgClass} from "@angular/common";
import {Request} from "../request/request";
import {Editor} from "./editor/editor";
import {Response} from "./response/response";

@Component({
  selector: 'app-action-designer',
  templateUrl: './designer.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    ConfigComponent,
    FormsModule,
    Response,
    Editor
  ],
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  private offcanvasService = inject(NgbOffcanvas);

  form = signal<CommonFormContainer|undefined>(undefined);
  action = signal<BackendAction|undefined>(undefined);
  message = signal<CommonMessage|undefined>(undefined);
  response = signal<BackendActionExecuteResponse|undefined>(undefined);
  actionClass = signal<string>('');

  request: BackendActionExecuteRequest = {
    method: 'GET',
    uriFragments: '',
    parameters: '',
    headers: '',
  };

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
    const action = this.action();
    if (!action || !this.request) {
      return;
    }

    try {
      await this.fusio.getClient().backend().action().update('' + action.id, action);

      this.response.set(await this.fusio.getClient().backend().action().execute('' + action.id, this.request));
    } catch (error) {
      this.message.set(this.error.convert(error));
    }
  }

  async loadAction(id: string) {
    try {
      this.action.set(await this.fusio.getClient().backend().action().get(id));

      const classString = this.action()?.class;
      if (classString) {
        this.actionClass.set(classString);

        this.loadConfig(classString);
      }
    } catch (error) {
      this.message.set(this.error.convert(error));
    }
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    try {
      this.form.set(await this.fusio.getClient().backend().action().getForm(classString));
    } catch (error) {
      this.message.set(this.error.convert(error));
    }
  }

  setConfig(config: BackendActionConfig) {
    this.action.update((entity) => {
      if (entity === undefined) {
        entity = {};
      }

      entity.config = config;

      return entity;
    });
  }

  setConfigKey(key: string, value: string) {
    this.action.update((entity) => {
      if (entity === undefined) {
        entity = {};
      }

      if (!entity.config) {
        entity.config = {};
      }

      entity.config[key] = value;

      return entity;
    });
  }

  getConfigKey(key: string): string|undefined {
    const action = this.action();
    if (!action?.config) {
      return;
    }

    const value = action?.config[key];
    if (!value) {
      return;
    }

    return value;
  }

  openRequest() {
    const offcanvasRef = this.offcanvasService.open(Request);
    offcanvasRef.componentInstance.request = this.request;
    offcanvasRef.result.then(
      (result: BackendActionExecuteRequest) => {
        this.request = result;
      },
      (reason) => {
      },
    )
  }

}
