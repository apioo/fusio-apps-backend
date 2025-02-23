import {Component} from '@angular/core';
import {ErrorService, Form, HelpComponent} from "ngx-fusio-sdk";
import {BackendAction, BackendActionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-action-modal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAction> {

  actions?: Array<BackendActionIndexEntry>;
  form?: CommonFormContainer;
  entityClass?: string;
  custom: boolean = false;

  constructor(private service: ActionService, private fusio: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    const response = await this.fusio.getClient().backend().action().getClasses();
    this.actions = response.actions;
  }

  protected override async onLoad() {
    if (this.entity && this.entity.class) {
      this.loadConfig(this.entity.class);
    }
  }

  async changeClass(classString?: string) {
    if (!this.entity) {
      return;
    }

    this.entity.config = {};
    this.loadConfig(classString);
  }

  async loadConfig(classString?: string) {
    if (!classString || !this.entity) {
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
    if (!this.entity) {
      return;
    }

    let className = this.entity.class;
    if (className) {
      let action = this.actions?.find((action) => {
        return action.class === className;
      })

      if (action && action.name) {
        const modalRef = this.modal.open(HelpComponent, {
          size: 'lg'
        });
        modalRef.componentInstance.path = 'api/action/' + action.name.toLowerCase() + '/';
      }
    }
  }
}
