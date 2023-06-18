import {Component} from '@angular/core';
import {Operation} from "fusio-sdk/dist/src/generated/backend/Operation";
import {User} from "fusio-sdk/dist/src/generated/backend/User";
import {Plan} from "fusio-sdk/dist/src/generated/backend/Plan";
import {App} from "fusio-sdk/dist/src/generated/backend/App";
import {Rate} from "fusio-sdk/dist/src/generated/backend/Rate";
import {AxiosResponse} from "axios";
import {Message} from "fusio-sdk/dist/src/generated/backend/Message";
import {Modal} from "ngx-fusio-sdk";
import {Client} from "fusio-sdk/dist/src/generated/backend/Client";

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

  operations?: Array<Operation>;
  users?: Array<User>;
  plans?: Array<Plan>;
  apps?: Array<App>;

  override async ngOnInit(): Promise<void> {
    this.loadOperations();
    this.loadUsers();
    this.loadPlans();
    this.loadApps();
  }

  protected async create(entity: Rate): Promise<Message> {
    entity.timespan = this.getTimespan();

    return this.fusio.getClient().rate().create(entity);
  }

  protected async update(entity: Rate): Promise<Message> {
    entity.timespan = this.getTimespan();

    return this.fusio.getClient().rate().update('' + entity.id, entity);
  }

  protected async delete(entity: Rate): Promise<Message> {
    return this.fusio.getClient().rate().delete('' + entity.id);
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

  private async loadOperations() {
    const response = await this.fusio.getClient().operation().getAll(0, 1024);
    this.operations = response.entry;
  }

  private async loadUsers() {
    const response = await this.fusio.getClient().user().getAll(0, 1024);
    this.users = response.entry;
  }

  private async loadPlans() {
    const response = await this.fusio.getClient().plan().getAll(0, 1024);
    this.plans = response.entry;
  }

  private async loadApps() {
    const response = await this.fusio.getClient().app().getAll(0, 1024);
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
