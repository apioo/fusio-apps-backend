import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendRole, BackendRoleCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendRole> {

  protected async getAll(parameters: Array<any>): Promise<BackendRoleCollection> {
    return this.fusio.getClient().backend().role().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendRole> {
    return this.fusio.getClient().backend().role().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/role';
  }

}
