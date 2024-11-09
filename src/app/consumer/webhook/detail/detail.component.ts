import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendWebhook} from "fusio-sdk";

@Component({
  selector: 'app-webhook-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendWebhook> {

}
