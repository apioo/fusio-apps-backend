import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendTransaction} from "fusio-sdk";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTransaction> {

}
