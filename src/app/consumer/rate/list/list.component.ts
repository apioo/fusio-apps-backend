import {Component} from '@angular/core';
import {List} from "ngx-fusio-sdk";
import {BackendRate, BackendRateCollection, Client} from "fusio-sdk";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-rate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends List<Client, BackendRate> {

  protected async getAll(parameters: Array<any>): Promise<BackendRateCollection> {
    return this.fusio.getClient().backend().rate().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendRate> {
    return this.fusio.getClient().backend().rate().get(id);
  }

  protected getDetailComponent(): any {
    return ModalComponent;
  }

  protected getRoute(): any {
    return '/rate';
  }

}
