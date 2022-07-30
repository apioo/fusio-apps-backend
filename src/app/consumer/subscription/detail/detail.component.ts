import {Component} from '@angular/core';
import {Event_Subscription} from "fusio-sdk/dist/src/generated/backend/Event_Subscription";
import {Detail} from "../../../detail";

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Event_Subscription> {

}
