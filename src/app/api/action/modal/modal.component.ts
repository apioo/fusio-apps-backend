import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";
import {ActionIndexEntry} from "fusio-sdk/dist/src/generated/backend/ActionIndexEntry";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";
import {FormQuery} from "fusio-sdk/dist/src/generated/backend/FormQuery";

@Component({
  selector: 'app-action-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Action> {

  actions?: Array<ActionIndexEntry>;
  form?: FormContainer;
  entityClass?: string;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const resource = await this.fusio.getClient().getBackendActionList();
    const response = await resource.backendActionActionGetIndex();
    this.actions = response.data.actions;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: Action): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendAction();
    return await resource.backendActionActionCreate(entity);
  }

  protected async update(entity: Action): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendActionByActionId('' + entity.id);
    return await resource.backendActionActionUpdate(entity);
  }

  protected async delete(entity: Action): Promise<AxiosResponse<Message>> {
    const resource = await this.fusio.getClient().getBackendActionByActionId('' + entity.id);
    return await resource.backendActionActionDelete();
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

  async changeClass(classString?: string) {
    this.entity.config = {};
    this.loadConfig(classString);
  }

  async loadConfig(classString?: string) {
    if (!classString) {
      return;
    }

    const query: FormQuery = {
      class: classString
    };

    const resource = await this.fusio.getClient().getBackendActionForm();
    const response = await resource.backendActionActionGetForm(query);
    this.form = response.data;

    const hasChanged = this.entityClass && this.entityClass !== this.entity.class;
    this.entityClass = this.entity.class;

    if (hasChanged) {
      this.entity.config = {};
    }
  }

  showHelp() {
    let className = this.entity.class;
    if (className) {
      let action = this.actions?.find((action) => {
        return action.class === className;
      })

      if (action && action.name) {
        const modalRef = this.modalService.open(HelpComponent, {
          size: 'lg'
        });
        modalRef.componentInstance.path = 'api/action/' + action.name.toLowerCase() + '/';
      }
    }
  }
}
