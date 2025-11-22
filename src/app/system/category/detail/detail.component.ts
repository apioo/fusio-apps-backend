import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendCategory} from "fusio-sdk";
import {TransactionService} from "../../../services/transaction.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-category-detail',
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
export class DetailComponent extends Detail<BackendCategory> {

  constructor(private service: CategoryService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CategoryService {
    return this.service;
  }

}
