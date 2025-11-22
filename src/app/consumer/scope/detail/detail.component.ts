import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendScope} from "fusio-sdk";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ScopeService} from "../../../services/scope.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-scope-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendScope> {

  constructor(private service: ScopeService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ScopeService {
    return this.service;
  }

}
