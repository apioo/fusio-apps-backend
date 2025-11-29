import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent, ScopesComponent} from "ngx-fusio-sdk";
import {BackendPlan} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../../../services/plan.service";
import {MarkdownComponent} from "ngx-markdown";
import {CurrencyPipe, JsonPipe} from "@angular/common";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    MarkdownComponent,
    CurrencyPipe,
    ScopesComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendPlan> {

  constructor(private service: PlanService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PlanService {
    return this.service;
  }

}
