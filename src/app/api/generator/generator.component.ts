import { Component, OnInit } from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";
import {FusioService} from "../../fusio.service";
import {GeneratorProviderChangelog} from "fusio-sdk/dist/src/generated/backend/GeneratorProviderChangelog";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {GeneratorProvider} from "fusio-sdk/dist/src/generated/backend/GeneratorProvider";
import {GeneratorIndexProvider} from "fusio-sdk/dist/src/generated/backend/GeneratorIndexProvider";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  providers?: Array<GeneratorIndexProvider>;
  provider: GeneratorProvider = {
    path: '',
    scopes: [],
    config: {},
  };
  selected?: string;
  form?: FormContainer;
  response?: Message;
  changelog?: GeneratorProviderChangelog;

  constructor(protected fusio: FusioService) { }

  async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendGenerator();
    const response = await resource.backendActionGeneratorIndex();
    if (response.data.providers) {
      this.providers = response.data.providers;
    }
  }

  async loadConfig() {
    if (!this.selected || !this.provider) {
      return;
    }

    const resource = await this.fusio.getClient().getBackendGeneratorByProvider(this.selected);
    const response = await resource.backendActionGeneratorForm();
    this.form = response.data;
    this.provider.config = {};
  }

  async loadChangelog() {
    if (!this.selected || !this.provider.config) {
      return;
    }

    try {
      const resource = await this.fusio.getClient().getBackendGeneratorByProvider(this.selected);
      const response = await resource.backendActionGeneratorChangelog(this.provider.config);
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
      const resource = await this.fusio.getClient().getBackendGeneratorByProvider(this.selected);
      const response = await resource.backendActionGeneratorCreate(this.provider)
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
