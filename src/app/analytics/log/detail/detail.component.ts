import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";

@Component({
  selector: 'app-log-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Log> {

}
