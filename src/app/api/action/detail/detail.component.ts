import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendAction} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

}
