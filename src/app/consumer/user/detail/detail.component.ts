import {Component} from '@angular/core';
import {Detail} from "../../../detail";
import {User} from "fusio-sdk/dist/src/generated/backend/User";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<User> {

}
