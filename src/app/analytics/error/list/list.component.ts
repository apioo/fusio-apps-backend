import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendLogError, BackendLogErrorCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-error-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendLogError> {

  protected async getAll(parameters: Array<any>): Promise<BackendLogErrorCollection> {
    return this.fusio.getClient().backend().log().getAllErrors(...parameters);
  }

  protected async get(id: string): Promise<BackendLogError> {
    return this.fusio.getClient().backend().log().getError(id);
  }

  protected getDetailComponent(): any {
    return null;
  }

  protected getRoute(): any {
    return '/error';
  }

}
