import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {HelpService} from "../../../help.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Statistic_Chart} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart";
import {Converter} from "../converter";
import {ChartData} from "chart.js";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Log_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Log_Collection_Query";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter?: Filter;
  query?: Log_Collection_Query;
  chart?: ChartData<'line', Statistic_Chart_Data>;
  statistic = 'incoming_requests';
  search: string = '';

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

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  constructor(protected factory: FactoryService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      const statistic = params.get('statistic');
      if (statistic) {
        this.statistic = statistic;
        this.doFilter();
      }
    });

    this.doFilter();
  }

  async doFilter() {
    const statistic = await this.factory.getClient().backendStatistic();
    if (this.statistic === 'errors_per_route') {
      const response = await statistic.getBackendStatisticErrorsPerRoute().backendActionStatisticGetErrorsPerRoute(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_requests') {
      const response = await statistic.getBackendStatisticIncomingRequests().backendActionStatisticGetIncomingRequests(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_transactions') {
      const response = await statistic.getBackendStatisticIncomingTransactions().backendActionStatisticGetIncomingTransactions(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'issued_tokens') {
      const response = await statistic.getBackendStatisticIssuedTokens().backendActionStatisticGetIssuedTokens(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_apps') {
      const response = await statistic.getBackendStatisticMostUsedApps().backendActionStatisticGetMostUsedApps(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_routes') {
      const response = await statistic.getBackendStatisticMostUsedRoutes().backendActionStatisticGetMostUsedRoutes(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_average') {
      const response = await statistic.getBackendStatisticTimeAverage().backendActionStatisticGetTimeAverage(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_per_route') {
      const response = await statistic.getBackendStatisticTimePerRoute().backendActionStatisticGetTimePerRoute(this.query);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'used_points') {
      const response = await statistic.getBackendStatisticUsedPoints().backendActionStatisticGetUsedPoints(this.query);
      this.chart = Converter.convertChart(response.data);
    }
  }

  doSearch() {
    if (!this.query) {
      this.query = {search: this.search};
    } else {
      this.query.search = this.search;
    }
    this.doFilter();
  }

  selectStatistic() {
    this.router.navigate(['/statistic/' + this.statistic]);
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  get statisticName(): string|null {
    for (let i = 0; i < this.statistics.length; i++) {
      if (this.statistics[i].value === this.statistic) {
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
