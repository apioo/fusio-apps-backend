import {ChartData, ChartDataset} from "chart.js";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Statistic_Chart} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart";

export class Converter {

  public static convertChart(data: Statistic_Chart): ChartData<'line', Statistic_Chart_Data> {
    return {
      datasets: Converter.convertChartData(data.data, data.series),
      labels: data.labels || [],
    };
  }

  public static convertChartData(data?: Array<Statistic_Chart_Data>, series?: Array<string>): Array<ChartDataset<'line', Statistic_Chart_Data>> {
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
