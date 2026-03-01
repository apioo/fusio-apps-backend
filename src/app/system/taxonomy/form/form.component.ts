import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendTaxonomy} from "fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {TaxonomyService} from "../../../services/taxonomy.service";
import {TreeBuilder} from "../../../services/taxonomy/tree-builder.service";

@Component({
  selector: 'app-taxonomy-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendTaxonomy> {

  protected readonly parseInt = parseInt;

  constructor(public service: TaxonomyService, private treeBuilder: TreeBuilder, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): TaxonomyService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  protected override onSubmit() {
    this.treeBuilder.clear();
  }

}
