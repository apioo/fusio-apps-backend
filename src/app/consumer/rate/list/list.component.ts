import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";
import {Collection} from "fusio-sdk/dist/src/generated/backend/Collection";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-rate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, Rate> {

  protected async getAll(parameters: Array<any>): Promise<Collection<Rate>> {
    return this.fusio.getClient().rate().getAll(...parameters);
  }

  protected async get(id: string): Promise<Rate> {
    return this.fusio.getClient().rate().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/rate';
  }

}
