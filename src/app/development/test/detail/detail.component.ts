import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTest} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {TestService} from "../../../services/test.service";

@Component({
  selector: 'app-test-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTest> {

  constructor(private service: TestService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TestService {
    return this.service;
  }

}
