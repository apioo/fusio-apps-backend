import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";

@Component({
  selector: 'app-category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Category> {

}
