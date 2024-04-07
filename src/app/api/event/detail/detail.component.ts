import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendEvent} from "fusio-sdk/dist/BackendEvent";

@Component({
  selector: 'app-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendEvent> {

}
