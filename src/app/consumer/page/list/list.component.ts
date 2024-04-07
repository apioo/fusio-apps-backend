import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendPage} from "fusio-sdk/dist/BackendPage";
import {BackendPageCollection} from "fusio-sdk/dist/BackendPageCollection";

@Component({
  selector: 'app-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendPage> {

  protected async getAll(parameters: Array<any>): Promise<BackendPageCollection> {
    return this.fusio.getClient().backend().page().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendPage> {
    return this.fusio.getClient().backend().page().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/page';
  }

}
