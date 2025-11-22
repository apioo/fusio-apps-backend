import {Component} from '@angular/core';
import {ErrorService, Form, MessageComponent} from "ngx-fusio-sdk";
import {BackendTest, BackendTestConfig} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../services/test.service";
import {NgbActiveModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormsModule} from "@angular/forms";
import {EditorComponent} from "ngx-monaco-editor-v2";

@Component({
    selector: 'app-test-form',
    templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormsModule,
    NgbPopover,
    EditorComponent
  ],
    styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTest> {

  body: string = '';
  config?: BackendTestConfig;
  disabled: boolean = false;

  constructor(private service: TestService, public modal: NgbActiveModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TestService {
    return this.service;
  }

  override onLoad() {
    this.disabled = this.entity().status === 6;
    this.config = this.entity().config;
    if (this.config?.body) {
      this.body = JSON.stringify(this.config?.body, null, 2);
    }
  }

  protected override beforeUpdate(entity: BackendTest): BackendTest {
    const data = Object.assign({}, entity);
    data.status = this.disabled ? 6 : 1;
    if (this.body) {
      if (!data.config) {
        data.config = {
          method: "GET"
        };
      }
      data.config.body = JSON.parse(this.body);
    }

    return data;
  }

  protected override onSubmit() {
    this.modal.close(this.response)
  }

}
