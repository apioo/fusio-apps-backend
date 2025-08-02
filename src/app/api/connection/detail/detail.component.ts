import {Component, OnInit} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../../../services/connection.service";
import {LinkService} from "../../../services/connection/link.service";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConnection> implements OnInit {

  baseUrl?: string;

  constructor(private service: ConnectionService, private link: LinkService, private fusio: ApiService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConnectionService {
    return this.service;
  }

  public override ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
    return super.ngOnInit();
  }

  hasDesignerLink(connection: BackendConnection): boolean {
    return this.link.hasDesignerLink(connection);
  }

  getDesignerLink(connection: BackendConnection): Array<string> {
    return this.link.getDesignerLink(connection);
  }

  async doAuthorizeClick() {
    if (!this.selected) {
      return;
    }

    const response = await this.fusio.getClient().backend().connection().getRedirect('' + this.selected.id);
    if (response.redirectUri) {
      window.open(response.redirectUri, "_blank");
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
