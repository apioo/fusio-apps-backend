import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendCategory} from "fusio-sdk";
import {CategoryService} from "../../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-category-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendCategory> {

  constructor(private service: CategoryService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): CategoryService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
