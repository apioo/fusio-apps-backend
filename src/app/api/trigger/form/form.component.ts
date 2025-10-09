import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendTrigger} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TriggerService} from "../../../services/trigger.service";
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-trigger-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTrigger> {

  constructor(private service: TriggerService, public event: EventService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TriggerService {
    return this.service;
  }

}
