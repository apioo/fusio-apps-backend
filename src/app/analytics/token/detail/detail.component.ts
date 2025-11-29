import {Component} from '@angular/core';
import {Detail, ErrorService, ScopesComponent} from "ngx-fusio-sdk";
import {BackendToken} from "fusio-sdk";
import {TokenService} from "../../../services/token.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-token-detail',
  templateUrl: './detail.component.html',
  imports: [
    ScopesComponent,
    DatePipe,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendToken> {

  constructor(private service: TokenService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TokenService {
    return this.service;
  }

}
