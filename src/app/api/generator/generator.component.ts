import { Component, OnInit } from '@angular/core';
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FactoryService} from "../../factory.service";
import axios from "axios";
import {Generator_Provider_Changelog} from "fusio-sdk/dist/src/generated/backend/Generator_Provider_Changelog";
import {Generator_Index_Provider} from "fusio-sdk/dist/src/generated/backend/Generator_Index_Provider";
import {Generator_Provider} from "fusio-sdk/dist/src/generated/backend/Generator_Provider";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  providers?: Array<Generator_Index_Provider>;
  provider: Generator_Provider = {
    path: '',
    scopes: [],
    config: {},
  };
  selected?: string;
  form?: Form_Container;
  response?: Message;
  changelog?: Generator_Provider_Changelog;

  constructor(protected factory: FactoryService) { }

  async ngOnInit(): Promise<void> {
    const route = await this.factory.getClient().backendGenerator();
    const response = await route.getBackendGenerator().backendActionGeneratorIndex();
    if (response.data.providers) {
      this.providers = response.data.providers;
    }
  }

  async loadConfig() {
    if (!this.selected || !this.provider) {
      return;
    }

    const action = await this.factory.getClient().backendGenerator();
    const response = await action.getBackendGeneratorByProvider(this.selected).backendActionGeneratorForm();
    this.form = response.data;
    this.provider.config = {};
  }

  async loadChangelog() {
    if (!this.selected || !this.provider.config) {
      return;
    }

    try {
      const action = await this.factory.getClient().backendGenerator();
      const response = await action.getBackendGeneratorByProvider(this.selected).backendActionGeneratorChangelog(this.provider.config);
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
      const route = await this.factory.getClient().backendGenerator();
      const response = await route.getBackendGeneratorByProvider(this.selected).backendActionGeneratorCreate(this.provider)
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
