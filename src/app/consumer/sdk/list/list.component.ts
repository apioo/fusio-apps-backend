import {Component, OnInit} from '@angular/core';
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {SdkTypes} from "fusio-sdk/dist/src/generated/backend/SdkTypes";
import {BackendService, ErrorService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private backend: BackendService, private error: ErrorService) { }

  public types?: SdkTypes;
  public response?: Message;

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.backend.getClient().sdk().getAll();

      this.types = response.types;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

  async generate(type: string) {
    try {
      const response = await this.backend.getClient().sdk().generate({
        format: type
      });

      this.response = response;
    } catch (error) {
      this.response = this.error.convert(error);
    }
  }

}
