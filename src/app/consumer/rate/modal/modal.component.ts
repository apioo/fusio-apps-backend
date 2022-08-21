import {Component} from '@angular/core';
import {Route as ModelRoute} from "fusio-sdk/dist/src/generated/backend/Route";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import Client from "fusio-sdk/dist/src/generated/backend/Client";

@Component({
  selector: 'app-rate-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, Rate> {

  timespan = {
    value: 1,
    unit: 'hour'
  }

  intervals = [{
    key: 'minute',
    value: 'Minute'
  }, {
    key: 'hour',
    value: 'Hour'
  }, {
    key: 'day',
    value: 'Day'
  }, {
    key: 'week',
    value: 'Week'
  }, {
    key: 'month',
    value: 'Month'
  }]

  status = [{
    key: null,
    value: 'Yes/No'
  }, {
    key: true,
    value: 'Yes'
  }, {
    key: false,
    value: 'No'
  }]

  routes?: Array<ModelRoute>;
  users?: Array<User>;
  plans?: Array<Plan>;
  apps?: Array<App>;

  override async ngOnInit(): Promise<void> {
    this.loadRoutes();
    this.loadUsers();
    this.loadPlans();
    this.loadApps();
  }

  protected async create(entity: Rate): Promise<AxiosResponse<Message>> {
    entity.timespan = this.getTimespan();

    const group = await this.fusio.getClient().backendRate();
    return await group.getBackendRate().backendActionRateCreate(entity);
  }

  protected async update(entity: Rate): Promise<AxiosResponse<Message>> {
    entity.timespan = this.getTimespan();

    const group = await this.fusio.getClient().backendRate();
    return await group.getBackendRateByRateId('' + entity.id).backendActionRateUpdate(entity);
  }

  protected async delete(entity: Rate): Promise<AxiosResponse<Message>> {
    const group = await this.fusio.getClient().backendRate();
    return await group.getBackendRateByRateId('' + entity.id).backendActionRateDelete();
  }

  protected newEntity(): Rate {
    return {
      priority: 0,
      name: '',
      rateLimit: 1800,
      timespan: '',
      allocation: []
    };
  }

  private async loadRoutes() {
    const user = await this.fusio.getClient().backendRoute();
    const response = await user.getBackendRoutes().backendActionRouteGetAll({count: 1024});
    this.routes = response.data.entry;
  }

  private async loadUsers() {
    const user = await this.fusio.getClient().backendUser();
    const response = await user.getBackendUser().backendActionUserGetAll({count: 1024});
    this.users = response.data.entry;
  }

  private async loadPlans() {
    const user = await this.fusio.getClient().backendPlan();
    const response = await user.getBackendPlan().backendActionPlanGetAll({count: 1024});
    this.plans = response.data.entry;
  }

  private async loadApps() {
    const user = await this.fusio.getClient().backendApp();
    const response = await user.getBackendApp().backendActionAppGetAll({count: 1024});
    this.apps = response.data.entry;
  }

  addAllocation() {
    if (!this.entity.allocation) {
      this.entity.allocation = [];
    }
    this.entity.allocation.push({});
  }

  removeAllocation(index: number) {
    if (this.entity.allocation) {
      this.entity.allocation.splice(index, 1);
    }
  }

  private getTimespan(): string|undefined {
    if (this.timespan.unit === 'minute') {
      return 'PT' + this.timespan.value + 'M'
    } else if (this.timespan.unit === 'hour') {
      return 'PT' + this.timespan.value + 'H'
    } else if (this.timespan.unit === 'day') {
      return 'P' + this.timespan.value + 'D'
    } else if (this.timespan.unit === 'week') {
      return 'P' + this.timespan.value + 'W'
    } else if (this.timespan.unit === 'month') {
      return 'P' + this.timespan.value + 'M'
    } else {
      return undefined;
    }
  }

}
