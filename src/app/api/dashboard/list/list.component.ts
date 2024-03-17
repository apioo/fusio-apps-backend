import {Component, OnInit} from '@angular/core';
import {ChartOptions, Converter} from "../../../analytics/statistic/converter";
import {
  BackendDashboardApps,
  BackendDashboardRequests,
  BackendDashboardTransactions,
  BackendDashboardUsers
} from "fusio-sdk";
import {ApiService} from "../../../api.service";

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
  latestApps?: BackendDashboardApps;
  latestRequests?: BackendDashboardRequests;
  latestUsers?: BackendDashboardUsers;
  latestTransactions?: BackendDashboardTransactions;

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

    this.latestApps = response.latestApps;
    this.latestRequests = response.latestRequests;
    this.latestUsers = response.latestUsers;
    this.latestTransactions = response.latestTransactions;
  }

}
