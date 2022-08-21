import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {App} from "fusio-sdk/dist/src/generated/backend/App";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<App> {

}
