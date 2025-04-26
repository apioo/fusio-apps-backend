import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendFirewall} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FirewallService} from "../../../services/firewall.service";

@Component({
  selector: 'app-firewall-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendFirewall> {

  constructor(private service: FirewallService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FirewallService {
    return this.service;
  }

}
