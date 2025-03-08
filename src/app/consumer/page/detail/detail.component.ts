import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendPage} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {PageService} from "../../../services/page.service";

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendPage> {

  constructor(private service: PageService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PageService {
    return this.service;
  }

}
