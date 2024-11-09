import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendToken} from "fusio-sdk";

@Component({
  selector: 'app-token-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendToken> {

}
