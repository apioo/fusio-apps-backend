import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {GeneratorProviderChangelog} from "fusio-sdk/dist/src/generated/backend/GeneratorProviderChangelog";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {GeneratorProvider} from "fusio-sdk/dist/src/generated/backend/GeneratorProvider";
import {GeneratorIndexProvider} from "fusio-sdk/dist/src/generated/backend/GeneratorIndexProvider";
import {BackendService, ErrorService} from "ngx-fusio-sdk";

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

  constructor(private backend: BackendService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.backend.getClient().generator().getProviders();
    if (response.providers) {
      this.providers = response.providers;
    }
  }

  async loadConfig() {
    if (!this.selected || !this.provider) {
      return;
    }

    this.form = await this.backend.getClient().generator().getProviderForm(this.selected);
    this.provider.config = {};
  }

  async loadChangelog() {
    if (!this.selected || !this.provider.config) {
      return;
    }

    try {
      this.changelog = await this.backend.getClient().generator().getChangelog(this.selected, this.provider.config);
      this.response = undefined;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async submit() {
    if (!this.selected || !this.provider) {
      return;
    }

    try {
      this.response = await this.backend.getClient().generator().executeProvider(this.selected, this.provider);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
