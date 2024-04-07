import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendLogError} from "fusio-sdk/dist/BackendLogError";

@Component({
  selector: 'app-error-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendLogError> {

}
