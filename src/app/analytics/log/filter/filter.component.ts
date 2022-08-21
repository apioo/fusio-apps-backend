import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Route} from "fusio-sdk/dist/src/generated/backend/Route";
import {Log_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Log_Collection_Query";
import {FusioService} from "../../../fusio.service";

@Component({
  selector: 'app-log-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input()
  filter!: Log_Collection_Query;

  constructor(protected fusio: FusioService, public modal: NgbActiveModal) { }

  routes?: Array<Route>;
  apps?: Array<App>;
  users?: Array<User>;

  async ngOnInit(): Promise<void> {
    this.loadRoutes();
    this.loadApps();
    this.loadUsers();
  }

  async doSubmit() {
    this.modal.close(this.filter);
  }

  private async loadRoutes(): Promise<void> {
    const user = await this.fusio.getClient().backendRoute();
    const response = await user.getBackendRoutes().backendActionRouteGetAll({count: 1024});
    this.routes = response.data.entry;
  }

  private async loadApps(): Promise<void> {
    const user = await this.fusio.getClient().backendApp();
    const response = await user.getBackendApp().backendActionAppGetAll({count: 1024});
    this.apps = response.data.entry;
  }

  private async loadUsers(): Promise<void> {
    const user = await this.fusio.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

}
