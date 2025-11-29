import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent, ScopesComponent} from "ngx-fusio-sdk";
import {BackendRole} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../services/role.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-role-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    ScopesComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendRole> {

  constructor(private service: RoleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RoleService {
    return this.service;
  }

}
