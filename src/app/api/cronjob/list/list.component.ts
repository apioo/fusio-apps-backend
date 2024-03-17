import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {BackendCronjob, BackendCronjobCollection, Client} from "fusio-sdk";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendCronjob> {

  protected async getAll(parameters: Array<any>): Promise<BackendCronjobCollection> {
    return this.fusio.getClient().backend().cronjob().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendCronjob> {
    return this.fusio.getClient().backend().cronjob().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/cronjob';
  }

}
