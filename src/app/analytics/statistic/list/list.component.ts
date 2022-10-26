import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Converter} from "../converter";
import {ChartData} from "chart.js";
import {FilterComponent} from "../../log/filter/filter.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FusioService} from "../../../fusio.service";
import {HelpService} from "ngx-fusio-sdk";
import {LogCollectionQuery} from "fusio-sdk/dist/src/generated/backend/LogCollectionQuery";
import {StatisticChartData} from "fusio-sdk/dist/src/generated/backend/StatisticChartData";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter: LogCollectionQuery = {};
  chart?: ChartData<'line', StatisticChartData>;
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

  constructor(protected fusio: FusioService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) { }

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
    if (this.statistic === 'errors_per_route') {
      const resource = await this.fusio.getClient().getBackendStatisticErrorsPerRoute();
      const response = await resource.backendActionStatisticGetErrorsPerRoute(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_requests') {
      const resource = await this.fusio.getClient().getBackendStatisticIncomingRequests();
      const response = await resource.backendActionStatisticGetIncomingRequests(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_transactions') {
      const resource = await this.fusio.getClient().getBackendStatisticIncomingTransactions();
      const response = await resource.backendActionStatisticGetIncomingTransactions(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'issued_tokens') {
      const resource = await this.fusio.getClient().getBackendStatisticIssuedTokens();
      const response = await resource.backendActionStatisticGetIssuedTokens(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_apps') {
      const resource = await this.fusio.getClient().getBackendStatisticMostUsedApps();
      const response = await resource.backendActionStatisticGetMostUsedApps(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_routes') {
      const resource = await this.fusio.getClient().getBackendStatisticMostUsedRoutes();
      const response = await resource.backendActionStatisticGetMostUsedRoutes(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_average') {
      const resource = await this.fusio.getClient().getBackendStatisticTimeAverage();
      const response = await resource.backendActionStatisticGetTimeAverage(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_per_route') {
      const resource = await this.fusio.getClient().getBackendStatisticTimePerRoute();
      const response = await resource.backendActionStatisticGetTimePerRoute(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'used_points') {
      const resource = await this.fusio.getClient().getBackendStatisticUsedPoints();
      const response = await resource.backendActionStatisticGetUsedPoints(this.filter);
      this.chart = Converter.convertChart(response.data);
    }
  }

  doSearch() {
    if (!this.filter) {
      this.filter = {
        search: this.search
      };
    } else {
      this.filter.search = this.search;
    }
    this.doFilter();
  }

  doFilterClick() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter;
    modalRef.closed.subscribe(async (filter) => {
      this.filter = filter;
      await this.doFilter();
    });
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

interface Statistic {
  name: string,
  value: string,
}
