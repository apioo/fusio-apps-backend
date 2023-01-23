import { Injectable } from '@angular/core';
import {FusioService as Sdk} from "ngx-fusio-sdk";
import Client from "typehub-javascript-sdk/dist/src/Client";
import {CredentialsInterface, TokenStoreInterface} from "sdkgen-client";

@Injectable({
  providedIn: 'root'
})
export class TypehubService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined, tokenStore: TokenStoreInterface | undefined): Client {
    return new Client('https://api.typehub.cloud', credentials, tokenStore);
  }

}
