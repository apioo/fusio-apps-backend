import {Component, OnInit} from '@angular/core';
import {ChartOptions, Converter, PieChartOptions} from "../../../analytics/statistic/converter";
import {ApiService} from "../../../api.service";
import {BackendDashboardApps} from "fusio-sdk/dist/BackendDashboardApps";
import {BackendDashboardRequests} from "fusio-sdk/dist/BackendDashboardRequests";
import {BackendDashboardUsers} from "fusio-sdk/dist/BackendDashboardUsers";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorsPerOperation?: ChartOptions;
  incomingRequests?: ChartOptions;
  incomingTransactions?: ChartOptions;
  mostUsedOperations?: ChartOptions;
  timePerOperation?: ChartOptions;
  testCoverage?: PieChartOptions;
  latestApps?: BackendDashboardApps;
  latestRequests?: BackendDashboardRequests;
  latestUsers?: BackendDashboardUsers;

  constructor(private fusio: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.fusio.getClient().backend().dashboard().getAll();

    if (response.errorsPerOperation) {
      this.errorsPerOperation = Converter.convertChart(response.errorsPerOperation, 10);
    }

    if (response.incomingRequests) {
      this.incomingRequests = Converter.convertChart(response.incomingRequests, 10);
    }

    if (response.incomingTransactions) {
      this.incomingTransactions = Converter.convertChart(response.incomingTransactions, 10);
    }

    if (response.mostUsedOperations) {
      this.mostUsedOperations = Converter.convertChart(response.mostUsedOperations, 10);
    }

    if (response.timePerOperation) {
      this.timePerOperation = Converter.convertChart(response.timePerOperation, 10);
    }

    if (response.testCoverage) {
      this.testCoverage = Converter.convertPieChart(response.testCoverage);
    }

    this.latestApps = response.latestApps;
    this.latestRequests = response.latestRequests;
    this.latestUsers = response.latestUsers;
  }

}
