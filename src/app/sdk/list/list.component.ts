import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../factory.service";
import {Sdk_Types} from "fusio-sdk/dist/src/generated/backend/Sdk_Types";
import axios from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(protected factory: FactoryService) { }

  public types?: Sdk_Types;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.factory.getClient().backendSdk();
      const response = await group.getBackendSdk().backendActionSdkGetAll();

      this.types = response.data.types;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)  {
        this.response = error.response.data as Message;
      } else {
        throw error;
      }
    }
  }

  async generate(type: string) {
    try {
      const group = await this.factory.getClient().backendSdk();
      const response = await group.getBackendSdk().backendActionSdkGenerate({
        format: type
      });

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
