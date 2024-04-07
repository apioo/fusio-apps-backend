import {Component} from '@angular/core';
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/Client";
import {BackendRate} from "fusio-sdk/dist/BackendRate";
import {BackendOperation} from "fusio-sdk/dist/BackendOperation";
import {BackendUser} from "fusio-sdk/dist/BackendUser";
import {BackendPlan} from "fusio-sdk/dist/BackendPlan";
import {BackendApp} from "fusio-sdk/dist/BackendApp";
import {CommonMessage} from "fusio-sdk/dist/CommonMessage";

@Component({
  selector: 'app-rate-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent extends Modal<Client, BackendRate> {

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

  operations?: Array<BackendOperation>;
  users?: Array<BackendUser>;
  plans?: Array<BackendPlan>;
  apps?: Array<BackendApp>;

  override async ngOnInit(): Promise<void> {
    this.loadOperations();
    this.loadUsers();
    this.loadPlans();
    this.loadApps();
  }

  protected async create(entity: BackendRate): Promise<CommonMessage> {
    entity.timespan = this.getTimespan();

    return this.fusio.getClient().backend().rate().create(entity);
  }

  protected async update(entity: BackendRate): Promise<CommonMessage> {
    entity.timespan = this.getTimespan();

    return this.fusio.getClient().backend().rate().update('' + entity.id, entity);
  }

  protected async delete(entity: BackendRate): Promise<CommonMessage> {
    return this.fusio.getClient().backend().rate().delete('' + entity.id);
  }

  protected newEntity(): BackendRate {
    return {
      priority: 0,
      name: '',
      rateLimit: 1800,
      timespan: '',
      allocation: []
    };
  }

  private async loadOperations() {
    const response = await this.fusio.getClient().backend().operation().getAll(0, 1024);
    this.operations = response.entry;
  }

  private async loadUsers() {
    const response = await this.fusio.getClient().backend().user().getAll(0, 1024);
    this.users = response.entry;
  }

  private async loadPlans() {
    const response = await this.fusio.getClient().backend().plan().getAll(0, 1024);
    this.plans = response.entry;
  }

  private async loadApps() {
    const response = await this.fusio.getClient().backend().app().getAll(0, 1024);
    this.apps = response.entry;
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
