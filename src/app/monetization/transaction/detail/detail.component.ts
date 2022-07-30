import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Transaction} from "fusio-sdk/dist/src/generated/backend/Transaction";

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Transaction> {

}
