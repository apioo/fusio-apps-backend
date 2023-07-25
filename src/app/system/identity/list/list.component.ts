import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Identity} from "fusio-sdk/dist/src/generated/backend/Identity";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-identity-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Identity> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Identity>> {
    return this.fusio.getClient().identity().getAll(...parameters);
  }

  protected async get(id: string): Promise<Identity> {
    return this.fusio.getClient().identity().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/identity';
  }

}
