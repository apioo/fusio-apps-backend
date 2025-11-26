import {Component, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {
  BackendGeneratorIndexProvider,
  BackendGeneratorProvider,
  BackendGeneratorProviderChangelog, BackendGeneratorProviderConfig,
  CommonFormContainer,
  CommonMessage
} from "fusio-sdk";
import {ApiService} from "../../api.service";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {TagEditorComponent} from "../../shared/tag-editor/tag-editor.component";
import {ConfigComponent} from "../../shared/config/config.component";

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    TagEditorComponent,
    ConfigComponent
  ],
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  providers = signal<Array<BackendGeneratorIndexProvider>>([]);
  provider = signal<BackendGeneratorProvider>({
    path: '',
    scopes: [],
    config: {},
  });

  selected = signal<string|undefined>(undefined);
  form = signal<CommonFormContainer|undefined>(undefined);
  response = signal<CommonMessage|undefined>(undefined);
  changelog = signal<BackendGeneratorProviderChangelog|undefined>(undefined);

  constructor(private fusio: ApiService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().generator().getClasses();
    if (response.providers) {
      this.providers.set(response.providers || []);
    }
  }

  setPath(path: string) {
    this.provider.update((provider) => {
      provider.path = path;
      return provider;
    });
  }

  setScopes(scopes: Array<string>) {
    this.provider.update((provider) => {
      provider.scopes = scopes;
      return provider;
    });
  }

  setPublic(pub: boolean) {
    this.provider.update((provider) => {
      provider.public = pub;
      return provider;
    });
  }

  setConfig(config: BackendGeneratorProviderConfig) {
    this.provider.update((provider) => {
      provider.config = config;
      return provider;
    });
  }

  async loadConfig() {
    const selected = this.selected();
    if (!selected || !this.provider()) {
      return;
    }

    this.form.set(await this.fusio.getClient().backend().generator().getForm(selected));

    this.provider.update((provider) => {
      provider.config = {};
      return provider;
    });
  }

  async loadChangelog() {
    const selected = this.selected();
    const provider = this.provider();
    if (!selected || !provider.config) {
      return;
    }

    try {
      this.changelog.set(await this.fusio.getClient().backend().generator().getChangelog(selected, provider.config));
      this.response.set(undefined);
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async submit() {
    const selected = this.selected();
    const provider = this.provider();
    if (!selected || !provider) {
      return;
    }

    try {
      this.response.set(await this.fusio.getClient().backend().generator().executeProvider(selected, provider));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
