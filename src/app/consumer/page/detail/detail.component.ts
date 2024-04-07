import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendPage} from "fusio-sdk/dist/BackendPage";

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendPage> {

}
