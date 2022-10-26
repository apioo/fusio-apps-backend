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
    const resource = await this.backend.getClient().getBackendDashboard();
    const response = await resource.backendActionDashboardGetAll()

    if (response.data.errorsPerRoute) {
      this.errorsPerRoute = Converter.convertChart(response.data.errorsPerRoute, 10);
    }

    if (response.data.incomingRequests) {
      this.incomingRequests = Converter.convertChart(response.data.incomingRequests, 10);
    }

    if (response.data.incomingTransactions) {
      this.incomingTransactions = Converter.convertChart(response.data.incomingTransactions, 10);
    }

    if (response.data.mostUsedRoutes) {
      this.mostUsedRoutes = Converter.convertChart(response.data.mostUsedRoutes, 10);
    }

    if (response.data.timePerRoute) {
      this.timePerRoute = Converter.convertChart(response.data.timePerRoute, 10);
    }

    this.latestApps = response.data.latestApps;
    this.latestRequests = response.data.latestRequests;
    this.latestUsers = response.data.latestUsers;
    this.latestTransactions = response.data.latestTransactions;
  }

}
