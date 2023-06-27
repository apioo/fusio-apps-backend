import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Scope} from "fusio-sdk/dist/src/generated/backend/Scope";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-scope-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Scope> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Scope>> {
    return this.fusio.getClient().scope().getAll(...parameters);
  }

  protected async get(id: string): Promise<Scope> {
    return this.fusio.getClient().scope().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/scope';
  }

}
