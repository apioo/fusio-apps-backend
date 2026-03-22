import {Component} from '@angular/core';
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTaxonomy} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorComponent} from "ngx-monaco-editor-v2-alternative";
import {FormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {TaxonomyService} from "../../../services/taxonomy.service";

@Component({
  selector: 'app-taxonomy-detail',
  templateUrl: './detail.component.html',
  imports: [
    MessageComponent,
    EditorComponent,
    FormsModule,
    JsonPipe
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<BackendTaxonomy> {

  constructor(private service: TaxonomyService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TaxonomyService {
    return this.service;
  }

}
