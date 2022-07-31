import {Component, Input, OnInit} from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Audit_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Audit_Collection_Query";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filter!: Audit_Collection_Query;

  constructor(protected factory: FactoryService, public modal: NgbActiveModal) { }

  apps?: Array<App>;
  users?: Array<User>;

  async ngOnInit(): Promise<void> {
    this.loadApps();
    this.loadUsers();
  }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  private async loadApps(): Promise<void> {
    const user = await this.factory.getClient().backendApp();
    const response = await user.getBackendApp().backendActionAppGetAll({count: 1024});
    this.apps = response.data.entry;
  }

  private async loadUsers(): Promise<void> {
    const user = await this.factory.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

}
