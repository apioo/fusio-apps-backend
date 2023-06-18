import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Role} from "fusio-sdk/dist/src/generated/backend/Role";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Role> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Role>> {
    return this.fusio.getClient().role().getAll(...parameters);
  }

  protected async get(id: string): Promise<Role> {
    return this.fusio.getClient().role().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/role';
  }

}
