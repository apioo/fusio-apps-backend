import {Component, signal} from '@angular/core';
import {ErrorService, Form, HelpComponent, MessageComponent} from "ngx-fusio-sdk";
import {BackendAction, BackendActionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../api.service";
import {NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {ConfigComponent} from "../../../shared/config/config.component";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";

@Component({
  selector: 'app-action-modal',
  templateUrl: './form.component.html',
  imports: [
    RouterLink,
    MessageComponent,
    FormsModule,
    NgbPopover,
    ConfigComponent,
    FormBreadcrump,
    FormButtons
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAction> {

  actions = signal<Array<BackendActionIndexEntry>>([]);
  form = signal<CommonFormContainer|undefined>(undefined);
  custom = signal<boolean>(false);

  entityClass? = '';

  constructor(private service: ActionService, private fusio: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    const response = await this.fusio.getClient().backend().action().getClasses();
    this.actions.set(response.actions || []);
  }

  protected override async onLoad() {
    this.loadConfig(this.entity().class);
  }

  async changeClass(classString?: string) {
    if (!classString) {
      return;
    }

    this.set(this.entity, 'config', {});
    this.loadConfig(classString);
  }

  async loadConfig(classString?: string) {
    if (!classString || !this.entity) {
      return;
    }

    try {
      this.form.set(await this.fusio.getClient().backend().action().getForm(classString));
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    const hasChanged = this.entityClass && this.entityClass !== this.entity().class;
    this.entityClass = this.entity().class;

    if (hasChanged) {
      this.set(this.entity, 'config', {});
    }
  }

  showHelp() {
    if (!this.entity) {
      return;
    }

    let className = this.entity().class;
    if (className) {
      let action = this.actions()?.find((action) => {
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
