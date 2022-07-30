import {ChartData, ChartDataset} from "chart.js";
import {Statistic_Chart_Data} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart_Data";
import {Statistic_Chart} from "fusio-sdk/dist/src/generated/backend/Statistic_Chart";

export class Converter {

  private static BACKGROUND_COLOR = ['rgba(148,159,177,0.2)'];
  private static BORDER_COLOR = ['rgba(148,159,177,1)'];
  private static POINT_BACKGROUND_COLOR = ['rgba(148,159,177,1)'];
  private static POINT_BORDER_COLOR = ['#fff'];
  private static POINT_HOVER_BACKGROUND_COLOR = ['#fff'];
  private static POINT_HOVER_BORDER_COLOR = ['rgba(148,159,177,0.8)'];

  public static convertChart(data: Statistic_Chart): ChartData<'line', Statistic_Chart_Data> {
    const labels = data.labels?.map((value) => {
      return value.substring(5);
    });

    return {
      datasets: Converter.convertChartData(data.data, data.series),
      labels: labels || [],
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
        backgroundColor: Converter.BACKGROUND_COLOR[i],
        borderColor: Converter.BORDER_COLOR[i],
        pointBackgroundColor: Converter.POINT_BACKGROUND_COLOR[i],
        pointBorderColor: Converter.POINT_BORDER_COLOR[i],
        pointHoverBackgroundColor: Converter.POINT_HOVER_BACKGROUND_COLOR[i],
        pointHoverBorderColor: Converter.POINT_HOVER_BORDER_COLOR[i],
        fill: 'origin',
      })
    }

    return dataSets;
  }
}
