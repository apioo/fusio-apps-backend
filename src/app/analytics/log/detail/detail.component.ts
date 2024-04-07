import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendLog} from "fusio-sdk/dist/BackendLog";

@Component({
  selector: 'app-log-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendLog> {

}
