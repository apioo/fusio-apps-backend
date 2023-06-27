import {Component} from '@angular/core';
import {Action} from "fusio-sdk/dist/src/generated/backend/Action";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";
import {ActionIndexEntry} from "fusio-sdk/dist/src/generated/backend/ActionIndexEntry";
import {FormContainer} from "fusio-sdk/dist/src/generated/backend/FormContainer";

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
    const response = await this.fusio.getClient().action().getClasses();
    this.actions = response.actions;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: Action): Promise<Message> {
    return this.fusio.getClient().action().create(entity);
  }

  protected async update(entity: Action): Promise<Message> {
    return this.fusio.getClient().action().update('' + entity.id, entity);
  }

  protected async delete(entity: Action): Promise<Message> {
    return this.fusio.getClient().action().delete('' + entity.id);
  }

  protected newEntity(): Action {
    return {
      name: '',
      class: '',
      async: false,
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

    this.form = await this.fusio.getClient().action().getForm(classString);

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
