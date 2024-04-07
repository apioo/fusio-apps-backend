import {Component, OnInit} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {ApiService} from "../../../api.service";
import {BackendMarketplaceCollectionApps} from "fusio-sdk/dist/BackendMarketplaceCollectionApps";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private fusio: ApiService, private error: ErrorService) { }

  working: boolean = false;
  public apps?: BackendMarketplaceCollectionApps;
  public response?: CommonMessage;

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().marketplace().getAll()

      this.apps = response.apps;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async install(appName: string) {
    try {
      this.response = await this.fusio.getClient().backend().marketplace().install({
        name: appName
      });
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async update(appName: string) {
    try {
      this.response = await this.fusio.getClient().backend().marketplace().update(appName);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async remove(appName: string) {
    try {
      this.response = await this.fusio.getClient().backend().marketplace().remove(appName);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }
}
