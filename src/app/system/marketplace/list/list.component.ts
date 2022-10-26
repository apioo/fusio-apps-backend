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
      const resource = await this.backend.getClient().getBackendMarketplace();
      const response = await resource.backendActionMarketplaceGetAll();

      this.apps = response.data.apps;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async install(appName: string) {
    try {
      const resource = await this.backend.getClient().getBackendMarketplace();
      const response = await resource.backendActionMarketplaceInstall({
        name: appName
      });

      //this.response = response.data;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async update(appName: string) {
    try {
      const resource = await this.backend.getClient().getBackendMarketplaceByAppName(appName);
      const response = await resource.backendActionMarketplaceUpdate();

      this.response = response.data;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async remove(appName: string) {
    try {
      const resource = await this.backend.getClient().getBackendMarketplaceByAppName(appName);
      const response = await resource.backendActionMarketplaceRemove();

      this.response = response.data;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }
}
