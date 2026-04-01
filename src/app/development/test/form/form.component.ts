import {Component, signal} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTest, BackendTestConfig} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../services/test.service";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";

@Component({
  selector: 'app-test-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormsModule,
    NgbPopover,
    EditorComponent,
    FormButtons
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTest> {

  body = signal<string>('');
  config = signal<BackendTestConfig|undefined>(undefined);
  disabled = signal<boolean>(false);

  constructor(private service: TestService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TestService {
    return this.service;
  }

  override onLoad() {
    this.disabled.set(this.entity().status === 6);
    this.config.set(this.entity().config);
    if (this.config()?.body) {
      this.body.set(JSON.stringify(this.config()?.body, null, 2));
    }
  }

  updateUriFragment(uriFragment: string) {
    this.config.update((config) => {
      if (config === undefined) {
        config = {};
      }
      config.uriFragments = uriFragment;
      return config;
    });
  }

  updateParameters(parameters: string) {
    this.config.update((config) => {
      if (config === undefined) {
        config = {};
      }
      config.parameters = parameters;
      return config;
    });
  }

  updateHeaders(headers: string) {
    this.config.update((config) => {
      if (config === undefined) {
        config = {};
      }
      config.headers = headers;
      return config;
    });
  }

  protected override beforeUpdate(entity: BackendTest): BackendTest {
    const data = Object.assign({}, entity);
    data.status = this.disabled() ? 6 : 1;

    let config = this.config();
    if (!config) {
      config = {
        method: "GET"
      };
    }

    const body = this.body();
    if (body) {
      config.body = JSON.parse(body);
    }

    data.config = config;

    return data;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
