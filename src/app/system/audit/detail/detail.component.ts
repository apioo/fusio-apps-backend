import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Audit} from "fusio-sdk/dist/src/generated/backend/Audit";

@Component({
  selector: 'app-audit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Audit> {

}
