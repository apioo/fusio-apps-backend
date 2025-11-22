import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {CommonMessage, MarketplaceObject} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {MarkdownComponent} from "ngx-markdown";

@Component({
  selector: 'app-marketplace-detail',
  templateUrl: './detail.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    MarkdownComponent
  ],
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  response?: CommonMessage;

  entity?: MarketplaceObject;

  type?: 'action'|'app' = 'action';
  user?: string
  name?: string

  constructor(private fusio: ApiService, private route: ActivatedRoute, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      this.type = params['type'];
      this.user = params['user'];
      this.name = params['name'];

      this.load();
    });
  }

  async load() {
    if (!this.user || !this.name) {
      return;
    }

    try {
      if (this.type === 'action') {
        this.entity = await this.fusio.getClient().backend().marketplace().action().get(this.user, this.name)
      } else {
        this.entity = await this.fusio.getClient().backend().marketplace().app().get(this.user, this.name)
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doInstall() {
    if (!this.user || !this.name) {
      return;
    }

    try {
      if (this.type === 'action') {
        this.response = await this.fusio.getClient().backend().marketplace().action().install({name: this.user + '/' + this.name});
      } else {
        this.response = await this.fusio.getClient().backend().marketplace().app().install({name: this.user + '/' + this.name});
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async doUpgrade() {
    if (!this.user || !this.name) {
      return;
    }

    try {
      if (this.type === 'action') {
        this.response = await this.fusio.getClient().backend().marketplace().action().upgrade(this.user, this.name);
      } else {
        this.response = await this.fusio.getClient().backend().marketplace().app().upgrade(this.user, this.name);
      }
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }
}
