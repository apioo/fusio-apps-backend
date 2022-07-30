import { Component } from '@angular/core';
import {UserService} from "./user.service";
import {User} from "fusio-sdk/dist/src/generated/backend/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fusio';

  user?: User;
  menu = [{
    title: 'Change password',
    path: '/account/change-password'
  }, {
    title: 'Logout',
    path: '/logout'
  }];

  constructor(private userMeta: UserService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
  }

}
