import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {BackendService, ErrorService, HelpService} from "ngx-fusio-sdk";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {ActionExecuteRequest} from "fusio-sdk/dist/src/generated/backend/ActionExecuteRequest";
import {ActionExecuteResponse} from "fusio-sdk/dist/src/generated/backend/ActionExecuteResponse";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  message?: Message;
  action?: Action;
  form?: FormContainer;
  request: ActionExecuteRequest = {
    method: 'GET',
    uriFragments: '',
    parameters: '',
    headers: '',
  };
  body: string = '';
  response?: ActionExecuteResponse;

  constructor(private backend: BackendService, private help: HelpService, private route: ActivatedRoute, private router: Router, private error: ErrorService) {
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

      await this.backend.getClient().action().update('' + this.action.id, this.action);

      this.response = await this.backend.getClient().action().execute('' + this.action.id, request);
    } catch (error) {
      this.message = this.error.convert(error);
    }
  }

  async loadAction(id: string) {
    try {
      this.action = await this.backend.getClient().action().get(id);

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

    this.form = await this.backend.getClient().action().getForm(classString);
  }

}
