import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendForm} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../../services/form.service";
import {OperationService} from "../../../services/operation.service";

@Component({
  selector: 'app-form-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendForm> {

  uiSchema?: string;

  constructor(private service: FormService, public operation: OperationService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FormService {
    return this.service;
  }

  protected override onLoad() {
    if (this.entity?.uiSchema) {
      this.uiSchema = JSON.stringify(this.entity?.uiSchema, null, 2);
    }
  }

  protected override beforeCreate(entity: BackendForm): BackendForm {
    if (this.uiSchema) {
      entity.uiSchema = JSON.parse(this.uiSchema);
    }

    return entity;
  }

  protected override beforeUpdate(entity: BackendForm): BackendForm {
    if (this.uiSchema) {
      entity.uiSchema = JSON.parse(this.uiSchema);
    }

    return entity;
  }

}
