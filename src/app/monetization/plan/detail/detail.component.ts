import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Plan> {

}
