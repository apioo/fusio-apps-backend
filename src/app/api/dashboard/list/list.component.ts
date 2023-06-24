import {Component, OnInit} from '@angular/core';
import {ChartOptions, Converter} from "../../../analytics/statistic/converter";
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

  errorsPerOperation?: ChartOptions;
  incomingRequests?: ChartOptions;
  incomingTransactions?: ChartOptions;
  mostUsedOperations?: ChartOptions;
  timePerOperation?: ChartOptions;
  latestApps?: DashboardApps;
  latestRequests?: DashboardRequests;
  latestUsers?: DashboardUsers;
  latestTransactions?: DashboardTransactions;

  constructor(private backend: BackendService) {
  }

  async ngOnInit(): Promise<void> {
    const response = await this.backend.getClient().dashboard().getAll();

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
