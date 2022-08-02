import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";

@Component({
  selector: 'app-role-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Role> {

}
