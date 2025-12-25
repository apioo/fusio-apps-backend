import { Component } from '@angular/core';
import {AccountContainerComponent} from "ngx-fusio-sdk";
import {NgbNav, NgbNavItem, NgbNavLink} from "@ng-bootstrap/ng-bootstrap";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  imports: [
    NgbNav,
    NgbNavItem,
    RouterLink,
    NgbNavLink,
    RouterOutlet
  ],
  styleUrls: ['./account.component.css']
})
export class AccountComponent extends AccountContainerComponent {

}
