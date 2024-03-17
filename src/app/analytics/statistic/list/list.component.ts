import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChartOptions, Converter} from "../converter";
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
  statistic = 'incoming_requests';
  search: string = '';

  statistics: Array<Statistic> = [{
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
    console.log('filter', this.filter);
    if (this.statistic === StatisticType.errors_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getErrorsPerOperation(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.incoming_requests) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingRequests(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.incoming_transactions) {
      const response = await this.fusio.getClient().backend().statistic().getIncomingTransactions(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.issued_tokens) {
      const response = await this.fusio.getClient().backend().statistic().getIssuedTokens(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.most_used_apps) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedApps(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.most_used_operations) {
      const response = await this.fusio.getClient().backend().statistic().getMostUsedOperations(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.time_average) {
      const response = await this.fusio.getClient().backend().statistic().getTimeAverage(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.time_per_operation) {
      const response = await this.fusio.getClient().backend().statistic().getTimePerOperation(...this.filter);
      this.chart = Converter.convertChart(response);
    } else if (this.statistic === StatisticType.used_points) {
      const response = await this.fusio.getClient().backend().statistic().getUsedPoints(...this.filter);
      this.chart = Converter.convertChart(response);
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
  errors_per_operation = 'errors_per_operation',
  incoming_requests = 'incoming_requests',
  incoming_transactions = 'incoming_transactions',
  most_used_apps = 'most_used_apps',
  issued_tokens = 'issued_tokens',
  most_used_operations = 'most_used_operations',
  time_average = 'time_average',
  time_per_operation = 'time_per_operation',
  used_points = 'used_points',
}
