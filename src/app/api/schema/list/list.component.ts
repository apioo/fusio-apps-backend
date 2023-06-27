import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Schema} from "fusio-sdk/dist/src/generated/backend/Schema";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Schema> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Schema>> {
    return this.fusio.getClient().schema().getAll(...parameters);
  }

  protected async get(id: string): Promise<Schema> {
    return this.fusio.getClient().schema().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/schema';
  }

}
