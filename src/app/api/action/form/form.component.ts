import {Component, computed, signal} from '@angular/core';
import {ErrorService, Form, HelpComponent, MessageComponent, Mode} from "ngx-fusio-sdk";
import {BackendAction, BackendActionIndexEntry, CommonFormContainer} from "fusio-sdk";
import {ActionService} from "../../../services/action.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../api.service";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbModal, NgbPopover} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {ConfigComponent} from "../../../shared/config/config.component";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";

@Component({
  selector: 'app-action-modal',
  templateUrl: './form.component.html',
  imports: [
    MessageComponent,
    FormsModule,
    NgbPopover,
    ConfigComponent,
    FormBreadcrump,
    FormButtons,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu
  ],
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendAction> {

  localActions = signal<Array<BackendActionIndexEntry>>([]);
  localSearch = signal<string>('');
  localFilter = computed(() => {
    const search = this.localSearch().toLowerCase();
    const list = this.localActions();
    if (!search) {
      return list;
    }

    return list.filter(action =>
      action.name?.toLowerCase().includes(search) ||
      action.class?.toLowerCase().includes(search)
    );
  });

  marketplaceActions = signal<Array<BackendActionIndexEntry>>([]);
  marketplaceSearch = signal<string>('');

  form = signal<CommonFormContainer|undefined>(undefined);
  source = signal<SourceType>('local');

  selectedAction = signal<BackendActionIndexEntry|undefined>(undefined);

  entityClass? = '';

  constructor(private service: ActionService, private fusio: ApiService, private modal: NgbModal, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): ActionService {
    return this.service;
  }

  override async ngOnInit(): Promise<void> {
    super.ngOnInit();

    if (this.mode === Mode.Update || this.mode === Mode.Delete) {
      this.source.set('custom');
    }

    this.loadActions();
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

  async loadActions() {
    if (this.source() === 'local') {
      const response = await this.fusio.getClient().backend().action().getClasses();
      this.localActions.set(response.actions || []);
    } else if (this.source() === 'marketplace') {
      const response = await this.fusio.getClient().backend().action().getClasses(true, 0, this.marketplaceSearch());
      this.marketplaceActions.set(response.actions || []);
    }
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

  changeSource(source: SourceType) {
    this.source.set(source);
    this.loadActions();
  }

  selectAction(action: BackendActionIndexEntry) {
    this.selectedAction.set(action);
    this.set(this.entity, 'class', action.class);
    this.changeClass(action.class);
  }

  showHelp() {
    if (!this.entity) {
      return;
    }

    let className = this.entity().class;
    if (className) {
      let action = this.localActions()?.find((action) => {
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

type SourceType = 'local'|'marketplace'|'custom';
