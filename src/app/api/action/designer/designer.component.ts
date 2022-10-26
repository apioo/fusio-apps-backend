import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";
import {HelpService} from "ngx-fusio-sdk";
import {FusioService} from "../../../fusio.service";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {ActionExecuteRequest} from "fusio-sdk/dist/src/generated/backend/ActionExecuteRequest";
import {ActionExecuteResponse} from "fusio-sdk/dist/src/generated/backend/ActionExecuteResponse";
import {FormQuery} from "fusio-sdk/dist/src/generated/backend/FormQuery";

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

  constructor(protected fusio: FusioService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router) {
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

      await (await this.fusio.getClient().getBackendActionByActionId('' + this.action.id)).backendActionActionUpdate(this.action);

      const resource = await this.fusio.getClient().getBackendActionExecuteByActionId('' + this.action.id);
      const response = await resource.backendActionActionExecute(request)
      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.message = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async loadAction(id: string) {
    try {
      const resource = await this.fusio.getClient().getBackendActionByActionId(id);
      const response = await resource.backendActionActionGet();
      this.action = response.data;

      if (this.action.class) {
        this.loadConfig(this.action.class);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.message = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    const query: FormQuery = {
      class: classString
    };

    const resource = await this.fusio.getClient().getBackendActionForm();
    const response = await resource.backendActionActionGetForm(query);
    this.form = response.data;
  }

}
