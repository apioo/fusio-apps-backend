import {Component} from '@angular/core';
import {ApiService} from "../../api.service";
import {BackendUser} from "fusio-sdk/dist/BackendUser";
import {BackendUserCollection} from "fusio-sdk/dist/BackendUserCollection";
import {ObjectSelector} from "ngx-fusio-sdk";

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
