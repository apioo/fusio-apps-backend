import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendConfig} from "fusio-sdk";

@Component({
  selector: 'app-config-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendConfig> {

}
