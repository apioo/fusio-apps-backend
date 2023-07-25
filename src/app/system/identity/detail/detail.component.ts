import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Identity} from "fusio-sdk/dist/src/generated/backend/Identity";

@Component({
  selector: 'app-identity-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Identity> {

}
