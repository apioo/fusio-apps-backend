import {Component, OnInit} from '@angular/core';
import {UserService} from "ngx-fusio-sdk";
import {BackendUser} from "fusio-sdk";
import {ApiService} from "./api.service";
import {Config} from "./editor/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fusio';

  user?: BackendUser;
  menu = [{
    title: 'Account',
    path: '/account'
  }, {
    title: 'Logout',
    path: '/logout'
  }];

  constructor(private userMeta: UserService, private fusio: ApiService) { }

  ngOnInit(): void {
    this.user = this.userMeta.get();

    Config.fusio = this.fusio;
  }

}
