import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";

@Component({
  selector: 'app-cronjob-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Cronjob> {

}
