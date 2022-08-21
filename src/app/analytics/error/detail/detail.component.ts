import {Component} from '@angular/core';
import {Log_Error} from "fusio-sdk/dist/src/generated/backend/Log_Error";
import {Detail} from "ngx-fusio-sdk";

@Component({
  selector: 'app-error-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Log_Error> {

}
