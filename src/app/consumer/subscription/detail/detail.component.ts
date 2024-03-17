import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendEventSubscription} from "fusio-sdk";

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendEventSubscription> {

}
