import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Form_Query} from "fusio-sdk/dist/src/generated/backend/Form_Query";
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Action_Execute_Request} from "fusio-sdk/dist/src/generated/backend/Action_Execute_Request";
import {Action_Execute_Response} from "fusio-sdk/dist/src/generated/backend/Action_Execute_Response";
import axios from "axios";
import {HelpService} from "ngx-fusio-sdk";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.css']
})
export class DesignerComponent implements OnInit {

  message?: Message;
  action?: Action;
  form?: Form_Container;
  request: Action_Execute_Request = {
    method: 'GET',
    uriFragments: '',
    parameters: '',
    headers: '',
  };
  body: string = '';
  response?: Action_Execute_Response;

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

      const group = await this.fusio.getClient().backendAction();
      await group.getBackendActionByActionId('' + this.action.id).backendActionActionUpdate(this.action)
      const response = await group.getBackendActionExecuteByActionId('' + this.action.id).backendActionActionExecute(request)
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
      const group = await this.fusio.getClient().backendAction();
      const response = await group.getBackendActionByActionId(id).backendActionActionGet();
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

    const query: Form_Query = {
      class: classString
    };

    const action = await this.fusio.getClient().backendAction();
    const response = await action.getBackendActionForm().backendActionActionGetForm(query);
    this.form = response.data;
  }

}
