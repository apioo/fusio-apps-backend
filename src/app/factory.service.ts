import { Injectable } from '@angular/core';
import {TokenStoreInterface} from "sdkgen-client/dist/src/TokenStoreInterface";
import {SessionTokenStore} from "sdkgen-client/dist/src/TokenStore/SessionTokenStore";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {ClientCredentials} from "sdkgen-client/dist/src/Credentials/ClientCredentials";

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  private readonly baseUrl: string;
  private readonly store: TokenStoreInterface;

  constructor() {
    if (typeof FUSIO_URL === 'string') {
      this.baseUrl = FUSIO_URL;
    } else {
      this.baseUrl = FactoryService.guessFusioEndpointUrl(false);
    }

    this.store = new SessionTokenStore();
  }

  public getClientWithCredentials(clientId: string, clientSecret: string): Client {
    const credentials = new ClientCredentials(
      clientId,
      clientSecret,
      this.baseUrl + '/authorization/token',
      ''
    );

    return new Client(this.baseUrl, credentials, this.store);
  }

  /**
   * This method should be normally used inside the app to obtain the client, we hope to get an access token from the
   * token store, if no token is available we have also no way to obtain an access token, in this case the client throws
   * an exception
   */
  public getClient(): Client {
    const credentials = new ClientCredentials(
      '',
      '',
      this.baseUrl + '/authorization/token',
      ''
    );

    return new Client(this.baseUrl, credentials, this.store);
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  private static guessFusioEndpointUrl(urlRewrite: boolean) {
    let url = window.location.href
    const pos = url.lastIndexOf('/fusio')
    if (pos !== -1) {
      url = url.substring(0, pos)
    }
    return url + (urlRewrite ? '/' : '/index.php/')
  }

}
