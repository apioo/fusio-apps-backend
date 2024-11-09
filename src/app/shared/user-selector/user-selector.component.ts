import {Component} from '@angular/core';
import {BackendUser, BackendUserCollection} from "fusio-sdk";
import {ObjectSelector} from "ngx-fusio-sdk";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.css']
})
export class UserSelectorComponent extends ObjectSelector<BackendUser, number> {

  constructor(private fusio: ApiService) {
    super();
  }

  protected async getAll(parameters: Array<any>): Promise<BackendUserCollection> {
    return this.fusio.getClient().backend().user().getAll(...parameters);
  }

  protected async get(id: string): Promise<BackendUser> {
    return this.fusio.getClient().backend().user().get(id);
  }

}
