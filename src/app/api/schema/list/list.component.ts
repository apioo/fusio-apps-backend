import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {ModalComponent} from "../modal/modal.component";
import {Client} from "fusio-sdk/dist/Client";
import {BackendSchema} from "fusio-sdk/dist/BackendSchema";
import {BackendSchemaCollection} from "fusio-sdk/dist/BackendSchemaCollection";

@Component({
  selector: 'app-schema-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendSchema> {

  protected async getAll(parameters: Array<any>): Promise<BackendSchemaCollection> {
    return this.fusio.getClient().backend().schema().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendSchema> {
    return this.fusio.getClient().backend().schema().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/schema';
  }

}
