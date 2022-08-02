import { Component, OnInit } from '@angular/core';
import {Detail} from "../../../detail";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {User} from "fusio-sdk/dist/src/generated/backend/User";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App> {

}
