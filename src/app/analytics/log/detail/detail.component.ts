import {Component} from '@angular/core';
import {Log} from "fusio-sdk/dist/src/generated/backend/Log";
import {Detail} from "ngx-fusio-sdk";

@Component({
  selector: 'app-log-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Log> {

}
