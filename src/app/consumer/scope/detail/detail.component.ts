import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";

@Component({
  selector: 'app-scope-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Scope> {

}
