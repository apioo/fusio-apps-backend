import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendApp} from "fusio-sdk/dist/BackendApp";

@Component({
  selector: 'app-app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendApp> {

}
