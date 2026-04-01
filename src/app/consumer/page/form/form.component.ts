import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendPage} from "fusio-sdk";
import {PageService} from "../../../services/page.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {EditorComponent} from "ngx-monaco-editor-v2";

@Component({
  selector: 'app-page-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    EditorComponent
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendPage> {

  status = [{
    key: 1,
    value: 'Visible'
  }, {
    key: 2,
    value: 'Hidden'
  }];

  constructor(private service: PageService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): PageService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
