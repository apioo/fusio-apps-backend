import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendToken} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-token-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendToken> {

  filter: any = {};

  constructor(private service: TokenService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.service;
  }

}
