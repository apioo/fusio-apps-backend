import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendPage} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PageService} from "../../../services/page.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-page-detail',
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
export class DetailComponent extends Detail<BackendPage> {

  constructor(private service: PageService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PageService {
    return this.service;
  }

}
