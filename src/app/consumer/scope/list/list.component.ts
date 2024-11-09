import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendScope, BackendScopeCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendScope> {

  protected async getAll(parameters: Array<any>): Promise<BackendScopeCollection> {
    return this.fusio.getClient().backend().scope().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendScope> {
    return this.fusio.getClient().backend().scope().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/scope';
  }

}
