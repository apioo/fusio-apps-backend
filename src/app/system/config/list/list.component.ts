import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendConfig} from "fusio-sdk/dist/BackendConfig";
import {BackendConfigCollection} from "fusio-sdk/dist/BackendConfigCollection";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendConfig> {

  protected async getAll(parameters: Array<any>): Promise<BackendConfigCollection> {
    return this.fusio.getClient().backend().config().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendConfig> {
    return this.fusio.getClient().backend().config().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/config';
  }

}
