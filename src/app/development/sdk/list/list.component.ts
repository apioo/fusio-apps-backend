import {Component, OnInit} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {BackendSdkTypes, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-sdk-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private fusio: ApiService, private error: ErrorService) { }

  public types: BackendSdkTypes = {};
  public response?: CommonMessage;

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().sdk().getAll();

      this.types = response.types || {};
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
