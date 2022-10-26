import { Component, OnInit } from '@angular/core';
import axios from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {FusioService} from "../../../fusio.service";
import {SdkTypes} from "fusio-sdk/dist/src/generated/backend/SdkTypes";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(protected fusio: FusioService) { }

  public types?: SdkTypes;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const group = await this.fusio.getClient().getBackendSdk();
      const response = await group.backendActionSdkGetAll();

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
      const group = await this.fusio.getClient().getBackendSdk();
      const response = await group.backendActionSdkGenerate({
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
