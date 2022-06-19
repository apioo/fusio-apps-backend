import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Action} from "fusio-sdk/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/src/generated/backend/Message";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Action> {

  protected async create(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendAction();
    return await group.getBackendAction().backendActionActionCreate(entity);
  }

  protected async update(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendAction();
    return await group.getBackendActionByActionId('' + entity.id).backendActionActionUpdate(entity);
  }

  protected async delete(entity: Action): Promise<AxiosResponse<Message>> {
    const group = await this.factory.getClient().backendAction();
    return await group.getBackendActionByActionId('' + entity.id).backendActionActionDelete();
  }

  protected newEntity(): Action {
    return {
      name: '',
      class: '',
      async: false,
      engine: 'Fusio\\Engine\\Factory\\Resolver\\PhpClass',
      config: {}
    };
  }

}
