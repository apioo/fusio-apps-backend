import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk";
import {EventService} from "../../../services/event.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendEvent> {

  constructor(private service: EventService, public action: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): EventService {
    return this.service;
  }

}
