import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendIdentity} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IdentityService} from "../../../services/identity.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-identity-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendIdentity> {

  public baseUrl: string = '';

  constructor(private fusio: ApiService, private service: IdentityService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    this.baseUrl = this.fusio.getBaseUrl();
  }

  protected getService(): IdentityService {
    return this.service;
  }

}
