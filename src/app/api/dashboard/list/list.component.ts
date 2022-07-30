import {Component, OnInit} from '@angular/core';
import {FactoryService} from "../../../factory.service";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Dashboard_Transactions} from "fusio-sdk/dist/src/generated/backend/Dashboard_Transactions";
import {Dashboard_Users} from "fusio-sdk/dist/src/generated/backend/Dashboard_Users";
import {Dashboard_Requests} from "fusio-sdk/dist/src/generated/backend/Dashboard_Requests";
import {Dashboard_Apps} from "fusio-sdk/dist/src/generated/backend/Dashboard_Apps";
import {ChartData} from "chart.js";
import {Converter} from "../../../analytics/statistic/converter";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorsPerRoute?: ChartData<'line', Statistic_Chart_Data>;
  incomingRequests?: ChartData<'line', Statistic_Chart_Data>;
  incomingTransactions?: ChartData<'line', Statistic_Chart_Data>;
  mostUsedRoutes?: ChartData<'line', Statistic_Chart_Data>;
  timePerRoute?: ChartData<'line', Statistic_Chart_Data>;
  latestApps?: Dashboard_Apps;
  latestRequests?: Dashboard_Requests;
  latestUsers?: Dashboard_Users;
  latestTransactions?: Dashboard_Transactions;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  constructor(private factory: FactoryService) {
  }

  async ngOnInit(): Promise<void> {
    const dashboard = await this.factory.getClient().backendDashboard();
    const response = await dashboard.getBackendDashboard().backendActionDashboardGetAll()

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
