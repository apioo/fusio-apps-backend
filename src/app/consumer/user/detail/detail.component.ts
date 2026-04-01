import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent, ScopesComponent} from "ngx-fusio-sdk";
import {BackendUser} from "fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-user-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    NgbTooltip,
    ScopesComponent,
    DatePipe,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendUser> {

  constructor(private service: UserService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): UserService {
    return this.service;
  }

  async resend(user: BackendUser) {
    try {
      this.response.set(await this.service.resend(user));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
