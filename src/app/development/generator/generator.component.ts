import {Component, OnInit} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {
  BackendGeneratorIndexProvider,
  BackendGeneratorProvider,
  BackendGeneratorProviderChangelog,
  CommonFormContainer,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  providers?: Array<BackendGeneratorIndexProvider>;
  provider: BackendGeneratorProvider = {
    path: '',
    scopes: [],
    config: {},
  };
  selected?: string;
  form?: CommonFormContainer;
  response?: CommonMessage;
  changelog?: BackendGeneratorProviderChangelog;

  constructor(private fusio: ApiService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().generator().getClasses();
    if (response.providers) {
      this.providers = response.providers;
    }
  }

  async loadConfig() {
    if (!this.selected || !this.provider) {
      return;
    }

    this.form = await this.fusio.getClient().backend().generator().getForm(this.selected);
    this.provider.config = {};
  }

  async loadChangelog() {
    if (!this.selected || !this.provider.config) {
      return;
    }

    try {
      this.changelog = await this.fusio.getClient().backend().generator().getChangelog(this.selected, this.provider.config);
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
      this.response = await this.fusio.getClient().backend().generator().executeProvider(this.selected, this.provider);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
