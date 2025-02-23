import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendTest} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../services/test.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-test-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTest> {

  body: string = '';
  disabled: boolean = false;

  constructor(private service: TestService, public modal: NgbActiveModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TestService {
    return this.service;
  }

  override onLoad() {
    this.disabled = this.entity?.status === 6;
    if (this.entity?.config?.body) {
      this.body = JSON.stringify(this.entity.config?.body, null, 2);
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
