import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendPage, CommonMessage} from "fusio-sdk";
import {PageService} from "../../../services/page.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-page-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendPage> {

  status = [{
    key: 1,
    value: 'Visible'
  }, {
    key: 2,
    value: 'Hidden'
  }];

  constructor(private service: PageService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PageService {
    return this.service;
  }

}
