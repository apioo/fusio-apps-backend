import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../../../services/event.service";
import {SchemaService} from "../../../services/schema.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendEvent> {

  constructor(private service: EventService, public schema: SchemaService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): EventService {
    return this.service;
  }

}
