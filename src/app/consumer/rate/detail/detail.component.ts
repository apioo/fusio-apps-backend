import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendRate} from "fusio-sdk/dist/BackendRate";

@Component({
  selector: 'app-rate-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendRate> {

}
