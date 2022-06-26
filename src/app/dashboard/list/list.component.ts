import { Component, OnInit } from '@angular/core';
import {FactoryService} from "../../factory.service";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Statistic_Chart} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart";
import {Dashboard_Transactions} from "fusio-sdk/dist/src/generated/backend/Dashboard_Transactions";
import {Dashboard_Users} from "fusio-sdk/dist/src/generated/backend/Dashboard_Users";
import {Dashboard_Requests} from "fusio-sdk/dist/src/generated/backend/Dashboard_Requests";
import {Dashboard_Apps} from "fusio-sdk/dist/src/generated/backend/Dashboard_Apps";
import {ChartData, ChartDataset} from "chart.js";

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

  constructor(private factory: FactoryService) {
  }

  async ngOnInit(): Promise<void> {
    const dashboard = await this.factory.getClient().backendDashboard();
    const response = await dashboard.getBackendDashboard().backendActionDashboardGetAll()

    if (response.data.errorsPerRoute) {
      this.errorsPerRoute = this.convertChart(response.data.errorsPerRoute);
    }

    if (response.data.incomingRequests) {
      this.incomingRequests = this.convertChart(response.data.incomingRequests);
    }

    if (response.data.incomingTransactions) {
      this.incomingTransactions = this.convertChart(response.data.incomingTransactions);
    }

    if (response.data.mostUsedRoutes) {
      this.mostUsedRoutes = this.convertChart(response.data.mostUsedRoutes);
    }

    if (response.data.timePerRoute) {
      this.timePerRoute = this.convertChart(response.data.timePerRoute);
    }

    this.latestApps = response.data.latestApps;
    this.latestRequests = response.data.latestRequests;
    this.latestUsers = response.data.latestUsers;
    this.latestTransactions = response.data.latestTransactions;
  }

  private convertChart(data: Statistic_Chart): ChartData<'line', Statistic_Chart_Data> {
    return {
      datasets: this.convertChartData(data.data, data.series),
      labels: data.labels || [],
    };
  }

  private convertChartData(data?: Array<Statistic_Chart_Data>, series?: Array<string>): Array<ChartDataset<'line', Statistic_Chart_Data>> {
    if (!data || !series) {
      return [];
    }

    let dataSets: Array<ChartDataset<'line', Statistic_Chart_Data>> = [];

    for (let i = 0; i < series.length; i++) {
      dataSets.push({
        label: series[i],
        data: data[i],
      })
    }

    return dataSets;
  }
}
