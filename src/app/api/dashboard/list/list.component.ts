import {Component, OnInit} from '@angular/core';
import {ChartOptions, Converter, PieChartOptions} from "../../../analytics/statistic/converter";
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
  testCoverage?: PieChartOptions;
  mostUsedActivities?: ChartOptions;
  activitiesPerUser?: ChartOptions;
  userRegistrations?: ChartOptions;

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

    if (response.mostUsedActivities) {
      this.mostUsedActivities = Converter.convertChart(response.mostUsedActivities, 10);
    }

    if (response.activitiesPerUser) {
      this.activitiesPerUser = Converter.convertChart(response.activitiesPerUser, 10);
    }

    if (response.userRegistrations) {
      this.userRegistrations = Converter.convertChart(response.userRegistrations, 10);
    }
  }

}
