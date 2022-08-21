import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {Page} from "fusio-sdk/dist/src/generated/backend/Page";

@Component({
  selector: 'app-page-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Page> {

}
