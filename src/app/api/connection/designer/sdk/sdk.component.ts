import {Component, computed, OnInit, signal} from '@angular/core';
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../../api.service";
import {ConnectionService} from "../../../../services/connection.service";
import {BackendConnection, CommonMessage} from "fusio-sdk";
import {TypeschemaEditorModule} from "ngx-typeschema-editor";

@Component({
  selector: 'app-connection-sdk',
  templateUrl: './sdk.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    TypeschemaEditorModule
  ],
  styleUrls: ['./sdk.component.css']
})
export class SdkComponent implements OnInit {

  selectedConnection = signal<BackendConnection|undefined>(undefined);

  response = signal<CommonMessage|undefined>(undefined);
  spec = signal<any>(undefined);

  typehubName = computed<string>(() => {
    const className = this.selectedConnection()?.class;
    if (!className) {
      return '';
    }

    return className.substring(className.lastIndexOf('.') + 1).toLowerCase();
  });

  constructor(private api: ApiService, private connection: ConnectionService, private route: ActivatedRoute, private error: ErrorService) {
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params) => {
      if (params['connection']) {
        const connection = await this.connection.get(params['connection']);
        if (connection) {
          try {
            this.spec.set(await this.api.getClient().backend().connection().sdk().get('' + connection.id));
            this.selectedConnection.set(connection);
          } catch (error) {
            this.response.set(this.error.convert(error));
          }
        }
      }
    });
  }

}
