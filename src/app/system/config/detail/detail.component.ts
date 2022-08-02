import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";

@Component({
  selector: 'app-config-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Config> {

}
