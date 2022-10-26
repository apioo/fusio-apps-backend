import { Component, OnInit } from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {AppToken} from "fusio-sdk/dist/src/generated/backend/AppToken";

@Component({
  selector: 'app-token-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<AppToken> {

}
