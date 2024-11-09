import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendUser} from "fusio-sdk";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendUser> {

}
