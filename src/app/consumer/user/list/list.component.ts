import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, User> {

  protected async getAll(parameters: Array<any>): Promise<Collection<User>> {
    return this.fusio.getClient().user().getAll(...parameters);
  }

  protected async get(id: string): Promise<User> {
    return this.fusio.getClient().user().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/user';
  }

}
