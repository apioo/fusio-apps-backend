import {Component, OnInit} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConnection> implements OnInit {

  public baseUrl?: string;

  constructor(private fusio: ApiService) {
    super();
  }

  public override ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
    return super.ngOnInit();
  }

  async doAuthorizeClick() {
    const response = await this.fusio.getClient().backend().connection().getRedirect('' + this.selected.id);
    if (response.redirectUri) {
      window.location.href = response.redirectUri;
    }
  }

  needsAuthorization(): boolean {
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
