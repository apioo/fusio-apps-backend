import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendAction} from "fusio-sdk/dist/BackendAction";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAction> {

}
