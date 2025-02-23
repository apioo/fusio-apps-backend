import {Component, OnInit} from '@angular/core';
import {Detail, ErrorService} from "ngx-fusio-sdk";
import {BackendIdentity} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ConfigService} from "../../../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-identity-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendIdentity> {

  public baseUrl: string = '';

  constructor(private fusio: ApiService, private service: ConfigService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  override async ngOnInit(): Promise<void> {
    this.baseUrl = this.fusio.getBaseUrl();
  }

  protected getService(): ConfigService {
    return this.service;
  }

}
