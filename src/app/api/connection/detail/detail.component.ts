import {Component, OnInit} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConnection> implements OnInit {

  baseUrl?: string;

  constructor(private service: ActionService, private fusio: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  public override ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
    return super.ngOnInit();
  }

  async doAuthorizeClick() {
    if (!this.selected) {
      return;
    }

    const response = await this.fusio.getClient().backend().connection().getRedirect('' + this.selected.id);
    if (response.redirectUri) {
      window.location.href = response.redirectUri;
    }
  }

  needsAuthorization(): boolean {
    if (!this.selected) {
      return false;
    }

    if (this.selected.oauth2 !== true) {
      // in case the connection needs oauth2 authorization
      return false;
    }

    if (this.selected.config?.['access_token']) {
      // in case we have an access token
      return false;
    }

    return true;
  }

}
