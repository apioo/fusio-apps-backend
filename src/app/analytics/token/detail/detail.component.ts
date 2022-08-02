import { Component, OnInit } from '@angular/core';
import {Detail} from "../../../detail";
import {App_Token} from "fusio-sdk/dist/src/generated/backend/App_Token";

@Component({
  selector: 'app-token-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App_Token> {

}
