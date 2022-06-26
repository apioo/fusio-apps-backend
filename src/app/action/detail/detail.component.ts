import {Component} from '@angular/core';
import {Detail} from "../../detail";
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Action_Index_Entry} from "fusio-sdk/dist/src/generated/backend/Action_Index_Entry";
import {Form_Container} from "fusio-sdk/dist/src/generated/backend/Form_Container";
import {Form_Query} from "fusio-sdk/dist/src/generated/backend/Form_Query";

@Component({
  selector: 'app-action-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends Detail<Action> {

  actions?: Array<Action_Index_Entry>;
  form?: Form_Container;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const action = await this.factory.getClient().backendAction();
    const response = await action.getBackendActionList().backendActionActionGetIndex();
    this.actions = response.data.actions;
  }

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

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    const query: Form_Query = {
      class: classString
    };

    const action = await this.factory.getClient().backendAction();
    const response = await action.getBackendActionForm().backendActionActionGetForm(query);
    this.form = response.data;
    this.entity.config = {};
  }

}
