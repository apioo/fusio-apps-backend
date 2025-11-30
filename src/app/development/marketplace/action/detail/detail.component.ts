import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Detail, ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {MarketplaceAction} from "fusio-sdk";
import {MarkdownComponent} from "ngx-markdown";
import {ActionService} from "../../../../services/marketplace/action.service";
import {EditorComponent} from "ngx-monaco-editor-v2";
import {JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-marketplace-action-detail',
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
export class DetailComponent extends Detail<MarketplaceAction> {

  constructor(private service: ActionService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  async doInstall(entity: MarketplaceAction) {
    try {
      this.response.set(await this.service.create(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

  async doUpgrade(entity: MarketplaceAction) {
    try {
      this.response.set(await this.service.update(entity));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
