import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Event} from "fusio-sdk/dist/src/generated/backend/Event";

@Component({
  selector: 'app-event-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event> {

}
