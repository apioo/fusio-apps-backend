import {Component, OnInit} from '@angular/core';
import {BackendUser} from "fusio-sdk";
import {UserService} from "ngx-fusio-sdk";
import {ApiService} from "./api.service";
import {InstanceManager} from "./instance-manager";
import {Config} from "./editor/config";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = 'fusio';
  hasUrl: boolean = true;
  hasActiveInstance: boolean = false;

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
    this.hasUrl = typeof FUSIO_URL !== 'undefined' && FUSIO_URL !== null && FUSIO_URL !== '';
    this.hasActiveInstance = InstanceManager.getActiveIndex() !== null;

    Config.fusio = this.fusio;
  }

}

declare global {
  var FUSIO_URL: string | undefined;
}
