import {Component} from '@angular/core';
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {LogError} from "fusio-sdk/dist/src/generated/backend/LogError";

@Component({
  selector: 'app-error-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, LogError> {

  protected async getAll(parameters: Array<any>): Promise<Collection<LogError>> {
    return this.fusio.getClient().log().getAllErrors(...parameters);
  }

  protected async get(id: string): Promise<LogError> {
    return this.fusio.getClient().log().getError(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/error';
  }

}
