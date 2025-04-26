import {Component} from '@angular/core';
import {ErrorService, List} from "ngx-fusio-sdk";
import {BackendFirewall} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FirewallService} from "../../../services/firewall.service";

@Component({
  selector: 'app-firewall-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<BackendFirewall> {

  constructor(private service: FirewallService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FirewallService {
    return this.service;
  }

}
