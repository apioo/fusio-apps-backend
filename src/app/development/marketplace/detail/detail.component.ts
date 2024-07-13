import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../api.service";
import {ActivatedRoute} from "@angular/router";
import {ErrorService} from "ngx-fusio-sdk";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";
import {MarketplaceObject} from "fusio-sdk/dist/MarketplaceObject";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
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
