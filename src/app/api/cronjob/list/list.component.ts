import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Cronjob} from "fusio-sdk/dist/src/generated/backend/Cronjob";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-cronjob-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Cronjob> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Cronjob>> {
    return this.fusio.getClient().cronjob().getAll(...parameters);
  }

  protected async get(id: string): Promise<Cronjob> {
    return this.fusio.getClient().cronjob().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/cronjob';
  }

}
