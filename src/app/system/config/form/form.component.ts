import {Component} from '@angular/core';
import {ErrorService, Form, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendConfig} from "fusio-sdk";
import {ConfigService} from "../../../services/config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-config-form',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendConfig> {

  constructor(private service: ConfigService, private help: HelpService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ConfigService {
    return this.service;
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
