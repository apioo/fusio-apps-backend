import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Category} from "fusio-sdk/dist/src/generated/backend/Category";
import {AxiosResponse} from "axios";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {Config} from "fusio-sdk/dist/src/generated/backend/Config";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-config-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Config> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Category>> {
    return this.fusio.getClient().config().getAll(...parameters);
  }

  protected async get(id: string): Promise<Category> {
    return this.fusio.getClient().config().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/config';
  }

}
