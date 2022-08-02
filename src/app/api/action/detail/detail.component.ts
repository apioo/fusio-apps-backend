import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Detail} from "../../../detail";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Action> {

}
