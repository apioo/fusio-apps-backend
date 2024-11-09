import {Component} from '@angular/core';
import {ApiService} from "../../api.service";
import {BackendApp, BackendAppCollection} from "fusio-sdk";
import {ObjectSelector} from "ngx-fusio-sdk";

@Component({
  selector: 'app-app-selector',
  templateUrl: './app-selector.component.html',
  styleUrls: ['./app-selector.component.css']
})
export class AppSelectorComponent extends ObjectSelector<BackendApp, number> {

  constructor(private fusio: ApiService) {
    super();
  }

  protected async getAll(parameters: Array<any>): Promise<BackendAppCollection> {
    return this.fusio.getClient().backend().app().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendApp> {
    return this.fusio.getClient().backend().app().get(id);
  }

}
