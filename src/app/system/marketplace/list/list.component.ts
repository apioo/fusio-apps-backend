import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import axios from "axios";
import {Marketplace_Collection_Apps} from "fusio-sdk/dist/src/generated/backend/Marketplace_Collection_Apps";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(protected factory: FactoryService) { }

  working: boolean = false;
  public apps?: Marketplace_Collection_Apps;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.factory.getClient().backendMarketplace();
      const response = await group.getBackendMarketplace().backendActionMarketplaceGetAll();

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
      const group = await this.factory.getClient().backendMarketplace();
      const response = await group.getBackendMarketplace().backendActionMarketplaceInstall({
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
      const group = await this.factory.getClient().backendMarketplace();
      const response = await group.getBackendMarketplaceByAppName(appName).backendActionMarketplaceUpdate();

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
      const group = await this.factory.getClient().backendMarketplace();
      const response = await group.getBackendMarketplaceByAppName(appName).backendActionMarketplaceRemove();

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
