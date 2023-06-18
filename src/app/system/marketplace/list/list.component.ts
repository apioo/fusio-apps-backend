import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {MarketplaceCollectionApps} from "fusio-sdk/dist/src/generated/backend/MarketplaceCollectionApps";
import {BackendService, ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private backend: BackendService, private error: ErrorService) { }

  working: boolean = false;
  public apps?: MarketplaceCollectionApps;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.backend.getClient().marketplace().getAll()

      this.apps = response.apps;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async install(appName: string) {
    try {
      this.response = await this.backend.getClient().marketplace().install({
        name: appName
      });
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async update(appName: string) {
    try {
      this.response = await this.backend.getClient().marketplace().update(appName);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async remove(appName: string) {
    try {
      this.response = await this.backend.getClient().marketplace().remove(appName);
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }
}
