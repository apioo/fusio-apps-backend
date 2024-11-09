import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendSchema, BackendSchemaCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

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
