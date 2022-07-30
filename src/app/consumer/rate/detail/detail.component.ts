import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Rate> {

}
