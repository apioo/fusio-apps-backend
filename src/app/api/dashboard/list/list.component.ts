import {Component, OnInit} from '@angular/core';
import {ChartData} from "chart.js";
import {Converter} from "../../../analytics/statistic/converter";
import {StatisticChartData} from "fusio-sdk/dist/src/generated/backend/StatisticChartData";
import {DashboardTransactions} from "fusio-sdk/dist/src/generated/backend/DashboardTransactions";
import {DashboardUsers} from "fusio-sdk/dist/src/generated/backend/DashboardUsers";
import {DashboardRequests} from "fusio-sdk/dist/src/generated/backend/DashboardRequests";
import {DashboardApps} from "fusio-sdk/dist/src/generated/backend/DashboardApps";
import {BackendService} from "ngx-fusio-sdk";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorsPerRoute?: ChartData<'line', StatisticChartData>;
  incomingRequests?: ChartData<'line', StatisticChartData>;
  incomingTransactions?: ChartData<'line', StatisticChartData>;
  mostUsedRoutes?: ChartData<'line', StatisticChartData>;
  timePerRoute?: ChartData<'line', StatisticChartData>;
  latestApps?: DashboardApps;
  latestRequests?: DashboardRequests;
  latestUsers?: DashboardUsers;
  latestTransactions?: DashboardTransactions;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  constructor(private backend: BackendService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.backend.getClient().dashboard().getAll();

    if (response.errorsPerOperation) {
      this.errorsPerRoute = Converter.convertChart(response.errorsPerOperation, 10);
    }

    if (response.incomingRequests) {
      this.incomingRequests = Converter.convertChart(response.incomingRequests, 10);
    }

    if (response.incomingTransactions) {
      this.incomingTransactions = Converter.convertChart(response.incomingTransactions, 10);
    }

    if (response.mostUsedOperations) {
      this.mostUsedRoutes = Converter.convertChart(response.mostUsedOperations, 10);
    }

    if (response.timePerOperation) {
      this.timePerRoute = Converter.convertChart(response.timePerOperation, 10);
    }

    this.latestApps = response.latestApps;
    this.latestRequests = response.latestRequests;
    this.latestUsers = response.latestUsers;
    this.latestTransactions = response.latestTransactions;
  }

}
