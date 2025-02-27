import {Component} from '@angular/core';
import {ErrorService, Form} from "ngx-fusio-sdk";
import {BackendApp, BackendOperation, BackendPlan, BackendRate, BackendUser} from "fusio-sdk";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OperationService} from "../../../services/operation.service";
import {UserService} from "../../../services/user.service";
import {AppService} from "../../../services/app.service";
import {PlanService} from "../../../services/plan.service";

@Component({
  selector: 'app-rate-modal',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends Form<BackendRate> {

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

  constructor(private service: RateService, public operation: OperationService, public user: UserService, public plan: PlanService, public app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RateService {
    return this.service;
  }

  protected override beforeCreate(entity: BackendRate): BackendRate {
    entity.timespan = this.getTimespan();

    return entity;
  }

  protected override beforeUpdate(entity: BackendRate): BackendRate {
    entity.timespan = this.getTimespan();

    return entity;
  }

  addAllocation() {
    if (!this.entity) {
      return;
    }

    if (!this.entity.allocation) {
      this.entity.allocation = [];
    }
    this.entity.allocation.push({});
  }

  removeAllocation(index: number) {
    if (!this.entity) {
      return;
    }

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

  protected readonly parseInt = parseInt;
}
