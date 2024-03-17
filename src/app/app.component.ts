import { Component } from '@angular/core';
import {UserService} from "ngx-fusio-sdk";
import {BackendUser} from "fusio-sdk";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fusio';

  user?: BackendUser;
  menu = [{
    title: 'Account',
    path: '/account'
  }, {
    title: 'Logout',
    path: '/logout'
  }];

  constructor(private userMeta: UserService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();
  }

}
