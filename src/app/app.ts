import {Component, OnInit, signal} from '@angular/core';
import {BackendUser} from "fusio-sdk";
import {UserService} from "ngx-fusio-sdk";
import {InstanceManager} from "./instance-manager";
import {InstanceComponent} from "./instance/instance.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {NgClass} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    InstanceComponent,
    NavigationComponent,
    NgClass,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    RouterLink,
    RouterOutlet
  ],
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = 'fusio';
  hasUrl = signal(true);
  hasActiveInstance = signal(false);

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
    this.hasUrl.set(typeof FUSIO_URL !== 'undefined' && FUSIO_URL !== null && FUSIO_URL !== '');
    this.hasActiveInstance.set(InstanceManager.getActiveIndex() !== null);
  }

}

declare global {
  var FUSIO_URL: string | undefined;
  var FUSIO_APP_KEY: string | undefined;
}
