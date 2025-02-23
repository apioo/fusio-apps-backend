import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendSchema} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {SchemaService} from "../../../services/schema.service";

@Component({
  selector: 'app-schema-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendSchema> {

  schema: string = '';

  constructor(private service: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): SchemaService {
    return this.service;
  }

  override onLoad(): void {
    if (this.entity && this.entity.source) {
      this.schema = JSON.stringify(this.entity.source, null, 2);
    }
  }

  protected override beforeCreate(entity: BackendSchema): BackendSchema {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return entity;
  }

  protected override beforeUpdate(entity: BackendSchema): BackendSchema {
    if (this.schema) {
      entity.source = JSON.parse(this.schema);
    }

    return entity;
  }

}
