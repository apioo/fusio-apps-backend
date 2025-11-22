import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendFirewall} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FirewallService} from "../../../services/firewall.service";
import {DatePipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-firewall-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    DatePipe,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
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
