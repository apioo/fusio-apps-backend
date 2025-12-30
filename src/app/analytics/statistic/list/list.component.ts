import {Component, computed, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChartOptions, Converter, PieChartOptions} from "../converter";
import {FilterComponent} from "../../log/filter/filter.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HelpService} from "ngx-fusio-sdk";
import {ApiService} from "../../../api.service";
import {FormsModule} from "@angular/forms";
import {ChartComponent} from "ngx-apexcharts";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [
    FormsModule,
    ChartComponent
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter = signal<Array<any>>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);

  collectionQuery = computed<Array<any>>(() => {
    let query: Array<any> = [];
    query.push(0);
    query.push(16);
    query.push(this.search());

    this.filter().forEach((value) => {
      if (value !== null && value !== undefined) {
        query.push(value);
      } else {
        query.push(undefined);
      }
    });

    return query;
  });

  chart = signal<ChartOptions|undefined>(undefined);
  pieChart = signal<PieChartOptions|undefined>(undefined);
  statistic = signal<string>('incoming_requests');
  search = signal<string>('');

  statistics: Array<Statistic> = [{
    name: 'Activities per user',
    value: StatisticType.activities_per_user
  }, {
    name: 'Errors per operation',
    value: StatisticType.errors_per_operation
  }, {
    name: 'Incoming requests',
    value: StatisticType.incoming_requests
  }, {
    name: 'Incoming transactions',
    value: StatisticType.incoming_transactions
  }, {
    name: 'Issued tokens',
    value: StatisticType.issued_tokens
  }, {
    name: 'Most used activities',
    value: StatisticType.most_used_activities
  }, {
    name: 'Most used apps',
    value: StatisticType.most_used_apps
  }, {
    name: 'Most used operations',
    value: StatisticType.most_used_operations
  }, {
    name: 'Time average',
    value: StatisticType.time_average
  }, {
    name: 'Time per operation',
    value: StatisticType.time_per_operation
  }, {
    name: 'Used points',
    value: StatisticType.used_points
  }, {
    name: 'Test coverage',
    value: StatisticType.test_coverage
  }, {
    name: 'User registrations',
    value: StatisticType.user_registrations
  }, {
    name: 'Requests per IP',
    value: StatisticType.requests_per_ip
  }, {
    name: 'Requests per operation',
    value: StatisticType.requests_per_operation
  }, {
    name: 'Requests per user',
    value: StatisticType.requests_per_user
  }];

  constructor(private fusio: ApiService, private help: HelpService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(params => {
      const statistic = params.get('statistic');
      if (statistic) {
        this.statistic.set(statistic);
      }
    });

    this.route.queryParams.subscribe(async params => {
      this.filter.set([
        params['from'],
        params['to'],
        params['operation'],
        params['app'],
        params['user'],
        params['ip'],
        params['userAgent'],
        params['method'],
        params['path'],
        params['header'],
        params['body'],
      ]);
      this.doFilter();
    });
  }

  async doFilter() {
    if (this.statistic() === StatisticType.activities_per_user) {
      const response = await this.fusio.getClient().backend().statistic().getActivitiesPerUser(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.errors_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getErrorsPerOperation(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.incoming_requests) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingRequests(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.incoming_transactions) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingTransactions(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.issued_tokens) {
      const response = await this.fusio.getClient().backend().statistic().getIssuedTokens(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.most_used_activities) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedActivities(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.most_used_apps) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedApps(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.most_used_operations) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedOperations(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.test_coverage) {
      const response = await this.fusio.getClient().backend().statistic().getTestCoverage();
      this.chart.set(undefined);
      this.pieChart.set(Converter.convertPieChart(response));
    } else if (this.statistic() === StatisticType.time_average) {
      const response = await this.fusio.getClient().backend().statistic().getTimeAverage(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.time_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getTimePerOperation(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.used_points) {
      const response = await this.fusio.getClient().backend().statistic().getUsedPoints(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.user_registrations) {
      const response = await this.fusio.getClient().backend().statistic().getUserRegistrations(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.requests_per_ip) {
      const response = await this.fusio.getClient().backend().statistic().getRequestsPerIP(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.requests_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getRequestsPerOperation(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    } else if (this.statistic() === StatisticType.requests_per_user) {
      const response = await this.fusio.getClient().backend().statistic().getRequestsPerUser(...this.collectionQuery());
      this.chart.set(Converter.convertChart(response));
      this.pieChart.set(undefined);
    }
  }

  doSearch() {
    this.doFilter();
  }

  doFilterClick() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter();
    modalRef.closed.subscribe(async (filter: Array<any>) => {
      await this.router.navigate([], {
        queryParams: {
          from: filter[0],
          to: filter[1],
          operation: filter[2],
          app: filter[3],
          user: filter[4],
          ip: filter[5],
          userAgent: filter[6],
          method: filter[7],
          path: filter[8],
          header: filter[9],
          body: filter[10],
        }
      });
    });
  }

  async selectStatistic(statistic: string) {
    this.router.navigate(['/statistic/' + statistic]).then(() => {
      this.doFilter();
    });
  }

  showHelp(path: string) {
    this.help.showDialog(path);
  }

  get statisticName(): string|null {
    for (let i = 0; i < this.statistics.length; i++) {
      if (this.statistics[i].value === this.statistic()) {
        return this.statistics[i].name;
      }
    }
    return null
  }

}

interface Statistic {
  name: string,
  value: StatisticType,
}

enum StatisticType {
  activities_per_user = 'activities_per_user',
  errors_per_operation = 'errors_per_operation',
  incoming_requests = 'incoming_requests',
  incoming_transactions = 'incoming_transactions',
  issued_tokens = 'issued_tokens',
  most_used_activities = 'most_used_activities',
  most_used_apps = 'most_used_apps',
  most_used_operations = 'most_used_operations',
  test_coverage = 'test_coverage',
  time_average = 'time_average',
  time_per_operation = 'time_per_operation',
  used_points = 'used_points',
  user_registrations = 'user_registrations',
  requests_per_ip = 'requests_per_ip',
  requests_per_operation = 'requests_per_operation',
  requests_per_user = 'requests_per_user',
}
