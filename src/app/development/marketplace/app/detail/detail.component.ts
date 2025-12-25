import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {MarketplaceApp} from "fusio-sdk";
import {MarkdownComponent} from "ngx-markdown";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AppService} from "../../../../services/marketplace/app.service";

@Component({
  selector: 'app-marketplace-detail',
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
export class DetailComponent extends Detail<MarketplaceApp> {

  constructor(private service: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): AppService {
    return this.service;
  }

  async doInstall(entity: MarketplaceApp) {
    try {
      this.response.set(await this.service.create(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doUpgrade(entity: MarketplaceApp) {
    try {
      this.response.set(await this.service.update(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
