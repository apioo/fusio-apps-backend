import {Component} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendFirewall} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FirewallService} from "../../../services/firewall.service";

@Component({
  selector: 'app-firewall-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendFirewall> {

  constructor(private service: FirewallService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FirewallService {
    return this.service;
  }

}
