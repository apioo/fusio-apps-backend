import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendConnection} from "fusio-sdk/dist/BackendConnection";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConnection> {

}
