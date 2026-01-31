import {Component, OnInit, signal} from '@angular/core';
import {ChartOptions, Converter, PieChartOptions} from "../../../analytics/statistic/converter";
import {ApiService} from "../../../api.service";
import {ChartComponent} from "ngx-apexcharts";
import {ErrorService, MessageComponent} from "ngx-fusio-sdk";
import {CommonMessage} from "fusio-sdk";
import {GroupItem, NavigationService} from "../../../navigation.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  imports: [
    ChartComponent,
    MessageComponent,
    RouterLink
  ],
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  errorsPerOperation = signal<ChartOptions|undefined>(undefined);
  incomingRequests = signal<ChartOptions|undefined>(undefined);
  incomingTransactions = signal<ChartOptions|undefined>(undefined);
  mostUsedOperations = signal<ChartOptions|undefined>(undefined);
  timePerOperation = signal<ChartOptions|undefined>(undefined);
  testCoverage = signal<PieChartOptions|undefined>(undefined);
  mostUsedActivities = signal<ChartOptions|undefined>(undefined);
  activitiesPerUser = signal<ChartOptions|undefined>(undefined);
  userRegistrations = signal<ChartOptions|undefined>(undefined);

  response = signal<CommonMessage|undefined>(undefined);
  hasDashboard = signal<boolean>(false);
  navigation = signal<Array<GroupItem>>([]);

  constructor(private fusio: ApiService, private error: ErrorService, private navigationService: NavigationService) {
  }

  async ngOnInit(): Promise<void> {
    if (this.fusio.hasScope('backend.dashboard')) {
      this.loadDashboard();
    } else {
      // in case the user has no dashboard rights we show all menu items
      this.navigation.set(this.navigationService.getAll());
    }
  }

  private async loadDashboard() {
    try {
      const response = await this.fusio.getClient().backend().dashboard().getAll();

      if (response.errorsPerOperation) {
        this.errorsPerOperation.set(Converter.convertChart(response.errorsPerOperation, 10));
      }

      if (response.incomingRequests) {
        this.incomingRequests.set(Converter.convertChart(response.incomingRequests, 10));
      }

      if (response.incomingTransactions) {
        this.incomingTransactions.set(Converter.convertChart(response.incomingTransactions, 10));
      }

      if (response.mostUsedOperations) {
        this.mostUsedOperations.set(Converter.convertChart(response.mostUsedOperations, 10));
      }

      if (response.timePerOperation) {
        this.timePerOperation.set(Converter.convertChart(response.timePerOperation, 10));
      }

      if (response.testCoverage) {
        this.testCoverage.set(Converter.convertPieChart(response.testCoverage));
      }

      if (response.mostUsedActivities) {
        this.mostUsedActivities.set(Converter.convertChart(response.mostUsedActivities, 10));
      }

      if (response.activitiesPerUser) {
        this.activitiesPerUser.set(Converter.convertChart(response.activitiesPerUser, 10));
      }

      if (response.userRegistrations) {
        this.userRegistrations.set(Converter.convertChart(response.userRegistrations, 10));
      }
    } catch (error) {
      this.response.set(this.error.convert(error));
    }

    this.hasDashboard.set(true);
  }

}
