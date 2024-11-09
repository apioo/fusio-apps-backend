import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendPlan} from "fusio-sdk";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendPlan> {

}
