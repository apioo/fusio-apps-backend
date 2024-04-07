import {Component} from '@angular/core';
import {HelpComponent, Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendAction} from "fusio-sdk/dist/BackendAction";
import {BackendActionIndexEntry} from "fusio-sdk/dist/BackendActionIndexEntry";
import {CommonFormContainer} from "fusio-sdk/dist/CommonFormContainer";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-action-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendAction> {

  actions?: Array<BackendActionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;
  custom: boolean = false;

  override async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().action().getClasses();
    this.actions = response.actions;

    if (this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  protected async create(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().create(entity);
  }

  protected async update(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendAction): Promise<CommonMessage> {
    return this.fusio.getClient().backend().action().delete('' + entity.id);
  }

  protected newEntity(): BackendAction {
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

    this.form = await this.fusio.getClient().backend().action().getForm(classString);

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
