import {Component, OnInit} from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {HelpService} from "../../../help.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Converter} from "../converter";
import {ChartData} from "chart.js";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Log_Collection_Query} from "fusio-sdk/dist/src/generated/backend/Log_Collection_Query";
import {FilterComponent} from "../../log/filter/filter.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter: Log_Collection_Query = {};
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

  constructor(protected factory: FactoryService, protected help: HelpService, protected route: ActivatedRoute, protected router: Router, protected modalService: NgbModal) { }

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
      const response = await statistic.getBackendStatisticErrorsPerRoute().backendActionStatisticGetErrorsPerRoute(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_requests') {
      const response = await statistic.getBackendStatisticIncomingRequests().backendActionStatisticGetIncomingRequests(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'incoming_transactions') {
      const response = await statistic.getBackendStatisticIncomingTransactions().backendActionStatisticGetIncomingTransactions(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'issued_tokens') {
      const response = await statistic.getBackendStatisticIssuedTokens().backendActionStatisticGetIssuedTokens(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_apps') {
      const response = await statistic.getBackendStatisticMostUsedApps().backendActionStatisticGetMostUsedApps(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'most_used_routes') {
      const response = await statistic.getBackendStatisticMostUsedRoutes().backendActionStatisticGetMostUsedRoutes(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_average') {
      const response = await statistic.getBackendStatisticTimeAverage().backendActionStatisticGetTimeAverage(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'time_per_route') {
      const response = await statistic.getBackendStatisticTimePerRoute().backendActionStatisticGetTimePerRoute(this.filter);
      this.chart = Converter.convertChart(response.data);
    } else if (this.statistic === 'used_points') {
      const response = await statistic.getBackendStatisticUsedPoints().backendActionStatisticGetUsedPoints(this.filter);
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
