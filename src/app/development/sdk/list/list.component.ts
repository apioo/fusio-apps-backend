import {Component, OnInit, signal} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {BackendSdkTypes, CommonMessage} from "fusio-sdk";
import {ApiService} from "../../../api.service";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-sdk-list',
  templateUrl: './list.component.html',
  imports: [
    KeyValuePipe,
    RouterLink
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  types = signal<BackendSdkTypes>({});
  response = signal<CommonMessage|undefined>(undefined);

  constructor(private fusio: ApiService, private error: ErrorService) { }

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.fusio.getClient().backend().sdk().getAll();

      this.types.set(response.types || {});
    } catch (error) {
      this.response.set(this.error.convert(error));
    }
  }

}
