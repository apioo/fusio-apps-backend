import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Connection} from "fusio-sdk/dist/src/generated/backend/Connection";

@Component({
  selector: 'app-connection-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Connection> {

}
