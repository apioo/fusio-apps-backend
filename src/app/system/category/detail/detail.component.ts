import {Component} from '@angular/core';
import {Detail} from "ngx-fusio-sdk";
import {BackendCategory} from "fusio-sdk/dist/BackendCategory";

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendCategory> {

}
