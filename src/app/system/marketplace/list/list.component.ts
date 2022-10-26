import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";
import {FusioService} from "../../../fusio.service";
import {MarketplaceCollectionApps} from "fusio-sdk/dist/src/generated/backend/MarketplaceCollectionApps";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(protected fusio: FusioService) { }

  working: boolean = false;
  public apps?: MarketplaceCollectionApps;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const resource = await this.fusio.getClient().getBackendMarketplace();
      const response = await resource.backendActionMarketplaceGetAll();

      this.apps = response.data.apps;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async install(appName: string) {
    try {
      const resource = await this.fusio.getClient().getBackendMarketplace();
      const response = await resource.backendActionMarketplaceInstall({
        name: appName
      });

      //this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async update(appName: string) {
    try {
      const resource = await this.fusio.getClient().getBackendMarketplaceByAppName(appName);
      const response = await resource.backendActionMarketplaceUpdate();

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async remove(appName: string) {
    try {
      const resource = await this.fusio.getClient().getBackendMarketplaceByAppName(appName);
      const response = await resource.backendActionMarketplaceRemove();

      this.response = response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }
}
