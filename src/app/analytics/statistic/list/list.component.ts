import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {HelpService} from "../../../help.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Statistic_Count} from "fusio-sdk/dist/src/generated/backend/Statistic_Count";
import {Converter} from "../converter";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter?: Filter;
  chart?: Statistic_Count;
  statistic = 'incoming_requests';

  statistics: Array<Statistic> = [{
    name: 'Errors per route',
    value: 'errors_per_route'
  }, {
    name: 'Incoming requests',
    value: 'incoming_requests'
  }, {
    name: 'Incoming transactions',
    value: 'incoming_transactions'
  }, {
    name: 'Issued tokens',
    value: 'issued_tokens'
  }, {
    name: 'Most used apps',
    value: 'most_used_apps'
  }, {
    name: 'Most used routes',
    value: 'most_used_routes'
  }, {
    name: 'Time average',
    value: 'time_average'
  }, {
    name: 'Time per route',
    value: 'time_per_route'
  }, {
    name: 'Used points',
    value: 'used_points'
  }];

  constructor(protected factory: FactoryService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router) { }

  async ngOnInit(): Promise<void> {
    this.doFilter();
  }

  async doFilter() {
    const statistic = await this.factory.getClient().backendStatistic();
    if (this.statistic === 'errors_per_route') {
      const response = await statistic.getBackendStatisticErrorsPerRoute().backendActionStatisticGetErrorsPerRoute();
      this.chart = response.data;
    } else if (this.statistic === 'incoming_requests') {
      const response = await statistic.getBackendStatisticIncomingRequests().backendActionStatisticGetIncomingRequests();
      this.chart = response.data;
    } else if (this.statistic === 'incoming_transactions') {
      const response = await statistic.getBackendStatisticIncomingTransactions().backendActionStatisticGetIncomingTransactions();
      this.chart = response.data;
    } else if (this.statistic === 'issued_tokens') {
      const response = await statistic.getBackendStatisticIssuedTokens().backendActionStatisticGetIssuedTokens();
      this.chart = response.data;
    } else if (this.statistic === 'most_used_apps') {
      const response = await statistic.getBackendStatisticMostUsedApps().backendActionStatisticGetMostUsedApps();
      this.chart = response.data;
    } else if (this.statistic === 'most_used_routes') {
      const response = await statistic.getBackendStatisticMostUsedRoutes().backendActionStatisticGetMostUsedRoutes();
      this.chart = response.data;
    } else if (this.statistic === 'time_average') {
      const response = await statistic.getBackendStatisticTimeAverage().backendActionStatisticGetTimeAverage();
      this.chart = response.data;
    } else if (this.statistic === 'time_per_route') {
      const response = await statistic.getBackendStatisticTimePerRoute().backendActionStatisticGetTimePerRoute();
      this.chart = response.data;
    } else if (this.statistic === 'used_points') {
      const response = await statistic.getBackendStatisticUsedPoints().backendActionStatisticGetUsedPoints();
      this.chart = response.data;
    }
  }

  getStatisticName(statisticValue: string): string|null {
    for (let i = 0; i < this.statistics.length; i++) {
      if (this.statistics[i].value === statisticValue) {
        return this.statistics[i].name;
      }
    }
    return null
  }

}

interface Filter {
  from?: Date,
  to?: Date,
}

interface Statistic {
  name: string,
  value: string,
}
