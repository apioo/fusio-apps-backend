import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {LogError} from "fusio-sdk/dist/src/generated/backend/LogError";

@Component({
  selector: 'app-error-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<LogError> {

}
