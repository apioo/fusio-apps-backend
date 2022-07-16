import { Component, OnInit } from '@angular/core';
import {Route_Index_Provider} from "fusio-sdk/dist/src/generated/backend/Route_Index_Provider";
import {Route_Provider} from "fusio-sdk/dist/src/generated/backend/Route_Provider";
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Route_Provider_Changelog} from "fusio-sdk/dist/src/generated/backend/Route_Provider_Changelog";
import {FactoryService} from "../../factory.service";
import axios from "axios";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  providers?: Array<Route_Index_Provider>;
  provider: Route_Provider = {
    path: '',
    scopes: [],
    config: {},
  };
  selected?: string;
  form?: Form_Container;
  response?: Message;
  changelog?: Route_Provider_Changelog;

  constructor(protected factory: FactoryService) { }

  async ngOnInit(): Promise<void> {
    const route = await this.factory.getClient().backendRoute();
    const response = await route.getBackendRoutesProvider().backendActionRouteProviderIndex();
    if (response.data.providers) {
      this.providers = response.data.providers;
    }
  }

  async loadConfig() {
    if (!this.selected || !this.provider) {
      return;
    }

    const action = await this.factory.getClient().backendRoute();
    const response = await action.getBackendRoutesProviderByProvider(this.selected).backendActionRouteProviderForm();
    this.form = response.data;
    this.provider.config = {};
  }

  async loadChangelog() {
    if (!this.selected || !this.provider.config) {
      return;
    }

    try {
      const action = await this.factory.getClient().backendRoute();
      const response = await action.getBackendRoutesProviderByProvider(this.selected).backendActionRouteProviderChangelog(this.provider.config);
      this.changelog = response.data;
      this.response = undefined;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async submit() {
    if (!this.selected || !this.provider) {
      return;
    }

    try {
      const route = await this.factory.getClient().backendRoute();
      const response = await route.getBackendRoutesProviderByProvider(this.selected).backendActionRouteProviderCreate(this.provider)
      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

}
