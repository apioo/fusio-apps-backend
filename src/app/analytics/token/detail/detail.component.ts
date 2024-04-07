import { Component, OnInit } from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendToken} from "fusio-sdk/dist/BackendToken";

@Component({
  selector: 'app-token-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendToken> {

}
