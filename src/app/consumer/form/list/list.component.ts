import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendForm} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FormService} from "../../../services/form.service";

@Component({
  selector: 'app-form-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendForm> {

  constructor(private service: FormService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FormService {
    return this.service;
  }

}
