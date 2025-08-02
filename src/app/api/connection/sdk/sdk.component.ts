import {Component, OnInit} from '@angular/core';
import {ErrorService} from "ngx-fusio-sdk";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";
import {ConnectionService} from "../../../services/connection.service";
import {BackendConnection, CommonMessage} from "fusio-sdk";

@Component({
  selector: 'app-connection-sdk',
  templateUrl: './sdk.component.html',
  styleUrls: ['./sdk.component.css']
})
export class SdkComponent implements OnInit {

  selectedConnection?: BackendConnection;

  message?: CommonMessage;
  spec?: any;

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private router: Router, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        this.selectedConnection = await this.connection.get(params['connection']);
        if (this.selectedConnection) {
          try {
            this.spec = await this.api.getClient().backend().connection().sdk().get('' + this.selectedConnection.id);
          } catch (error) {
            this.message = this.error.convert(error);
          }
        }
      }
    });
  }

}
