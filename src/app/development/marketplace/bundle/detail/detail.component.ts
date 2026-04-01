import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {MarketplaceBundle} from "fusio-sdk";
import {MarkdownComponent} from "ngx-markdown";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BundleService} from "../../../../services/marketplace/bundle.service";

@Component({
  selector: 'app-marketplace-bundle-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    MarkdownComponent,
    EditorComponent,
    JsonPipe,
    FormsModule
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<MarketplaceBundle> {

  constructor(private service: BundleService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): BundleService {
    return this.service;
  }

  async doInstall(entity: MarketplaceBundle) {
    try {
      this.response.set(await this.service.create(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doUpgrade(entity: MarketplaceBundle) {
    try {
      this.response.set(await this.service.update(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
