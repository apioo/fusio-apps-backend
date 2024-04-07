import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendScope} from "fusio-sdk/dist/BackendScope";

@Component({
  selector: 'app-scope-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendScope> {

}
