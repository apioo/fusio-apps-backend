import {Component} from '@angular/core';
import {ErrorService, Form, FormAutocompleteComponent, HelpService, MessageComponent} from "ngx-fusio-sdk";
import {BackendRate} from "fusio-sdk";
import {RateService} from "../../../services/rate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OperationService} from "../../../services/operation.service";
import {UserService} from "../../../services/user.service";
import {AppService} from "../../../services/app.service";
import {PlanService} from "../../../services/plan.service";
import {FormBreadcrump} from "../../../shared/form-breadcrump/form-breadcrump";
import {FormButtons} from "../../../shared/form-buttons/form-buttons";
import {FormsModule} from "@angular/forms";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-rate-modal',
  templateUrl: './form.component.html',
  imports: [
    FormBreadcrump,
    MessageComponent,
    FormButtons,
    FormsModule,
    NgbPopover,
    FormAutocompleteComponent
  ],
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

  constructor(private service: RateService, private help: HelpService, public operation: OperationService, public user: UserService, public plan: PlanService, public app: AppService, route: ActivatedRoute, router: Router, error: ErrorService) {
    super(route, router, error);
  }

  protected getService(): RateService {
    return this.service;
  }

  protected override onLoad() {
    let timespan = this.entity().timespan;
    if (!timespan) {
      return;
    }

    if (timespan.startsWith('PT')) {
      timespan = timespan.substring(2);
      this.timespan.value = parseInt(timespan);
      if (timespan.endsWith('M')) {
        this.timespan.unit = 'minute';
      } else if (timespan.endsWith('H')) {
        this.timespan.unit = 'hour';
      }
    } else if (timespan.startsWith('P')) {
      timespan = timespan.substring(1);
      this.timespan.value = parseInt(timespan);
      if (timespan.endsWith('D')) {
        this.timespan.unit = 'day';
      } else if (timespan.endsWith('W')) {
        this.timespan.unit = 'week';
      } else if (timespan.endsWith('M')) {
        this.timespan.unit = 'month';
      }
    }
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
    let allocation = this.entity().allocation;
    if (!allocation) {
      allocation = [];
    }

    allocation.push({});

    this.set(this.entity, 'allocation', allocation);
  }

  setAllocationOperationId(index: number, operationId: number) {
    this.entity.update((rate) => {
      if (!rate.allocation) {
        return rate;
      }
      rate.allocation[index].operationId = operationId;
      return rate;
    });
  }

  setAllocationUserId(index: number, userId: number) {
    this.entity.update((rate) => {
      if (!rate.allocation) {
        return rate;
      }
      rate.allocation[index].userId = userId;
      return rate;
    });
  }

  setAllocationPlanId(index: number, planId: number) {
    this.entity.update((rate) => {
      if (!rate.allocation) {
        return rate;
      }
      rate.allocation[index].planId = planId;
      return rate;
    });
  }

  setAllocationAppId(index: number, appId: number) {
    this.entity.update((rate) => {
      if (!rate.allocation) {
        return rate;
      }
      rate.allocation[index].appId = appId;
      return rate;
    });
  }

  setAllocationAuthenticated(index: number, authenticated: boolean) {
    this.entity.update((rate) => {
      if (!rate.allocation) {
        return rate;
      }
      rate.allocation[index].authenticated = authenticated;
      return rate;
    });
  }

  removeAllocation(index: number) {
    let allocation = this.entity().allocation;
    if (allocation) {
      allocation.splice(index, 1);

      this.set(this.entity, 'allocation', allocation);
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

  showHelp(path: string) {
    this.help.showDialog(path);
  }

}
