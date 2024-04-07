import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendAudit} from "fusio-sdk/dist/BackendAudit";

@Component({
  selector: 'app-audit-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendAudit> {

}
