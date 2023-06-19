import { Injectable } from '@angular/core';
import {FusioService as Sdk} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {CredentialsInterface} from "sdkgen-client";

@Injectable({
  providedIn: 'root'
})
export class FusioService extends Sdk<Client> {

  protected newClient(baseUrl: string, credentials: CredentialsInterface | null | undefined): Client {
    return new Client(baseUrl, credentials);
  }

}
