import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChartOptions, Converter, PieChartOptions} from "../converter";
import {FilterComponent} from "../../log/filter/filter.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HelpService} from "ngx-fusio-sdk";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  filter: Array<any> = [0, 16];
  chart?: ChartOptions;
  pieChart?: PieChartOptions;
  statistic = 'incoming_requests';
  search: string = '';

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
  }];

  constructor(private fusio: ApiService, private help: HelpService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

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
    if (this.statistic === StatisticType.activities_per_user) {
      const response = await this.fusio.getClient().backend().statistic().getActivitiesPerUser(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.errors_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getErrorsPerOperation(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.incoming_requests) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingRequests(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.incoming_transactions) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingTransactions(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.issued_tokens) {
      const response = await this.fusio.getClient().backend().statistic().getIssuedTokens(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.most_used_activities) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedActivities(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.most_used_apps) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedApps(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.most_used_operations) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedOperations(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.test_coverage) {
      const response = await this.fusio.getClient().backend().statistic().getTestCoverage();
      this.chart = undefined;
      this.pieChart = Converter.convertPieChart(response);
    } else if (this.statistic === StatisticType.time_average) {
      const response = await this.fusio.getClient().backend().statistic().getTimeAverage(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.time_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getTimePerOperation(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.used_points) {
      const response = await this.fusio.getClient().backend().statistic().getUsedPoints(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    } else if (this.statistic === StatisticType.user_registrations) {
      const response = await this.fusio.getClient().backend().statistic().getUserRegistrations(...this.filter);
      this.chart = Converter.convertChart(response);
      this.pieChart = undefined;
    }
  }

  doSearch() {
    this.filter = [0, 16, this.search];
    this.doFilter();
  }

  doFilterClick() {
    const modalRef = this.modalService.open(FilterComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.filter = this.filter.slice(3);
    modalRef.closed.subscribe(async (filter) => {
      this.filter = [0, 16, this.search, ...filter];
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
}
