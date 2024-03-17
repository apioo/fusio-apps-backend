import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendRole} from "fusio-sdk";

@Component({
  selector: 'app-role-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendRole> {

}
