import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendForm} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FormService} from "../../../services/form.service";
import {JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-form-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    JsonPipe,
    EditorComponent,
    FormsModule
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendForm> {

  constructor(private service: FormService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): FormService {
    return this.service;
  }

}
