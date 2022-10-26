import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {EventSubscription} from "fusio-sdk/dist/src/generated/backend/EventSubscription";

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<EventSubscription> {

}
