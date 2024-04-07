import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorService, HelpService} from "ngx-fusio-sdk";
import {ApiService} from "../../../api.service";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {BackendAction} from "fusio-sdk/dist/BackendAction";
import {CommonFormContainer} from "fusio-sdk/dist/CommonFormContainer";
import {BackendActionExecuteRequest} from "fusio-sdk/dist/BackendActionExecuteRequest";
import {BackendActionExecuteResponse} from "fusio-sdk/dist/BackendActionExecuteResponse";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  message?: CommonMessage;
  action?: BackendAction;
  form?: CommonFormContainer;
  request: BackendActionExecuteRequest = {
    method: 'GET',
    uriFragments: '',
    parameters: '',
    headers: '',
  };
  body: string = '';
  response?: BackendActionExecuteResponse;

  constructor(private fusio: ApiService, private help: HelpService, private route: ActivatedRoute, private router: Router, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadAction(id);
      }
    });
  }

  async submit() {
    if (!this.action || !this.request) {
      return;
    }

    try {
      const request = Object.assign({}, this.request);
      if (this.body) {
        request.body = JSON.parse(this.body);
      }

      await this.fusio.getClient().backend().action().update('' + this.action.id, this.action);

      this.response = await this.fusio.getClient().backend().action().execute('' + this.action.id, request);
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

  async loadAction(id: string) {
    try {
      this.action = await this.fusio.getClient().backend().action().get(id);

      if (this.action.class) {
        this.loadConfig(this.action.class);
      }
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    this.form = await this.fusio.getClient().backend().action().getForm(classString);
  }

}
