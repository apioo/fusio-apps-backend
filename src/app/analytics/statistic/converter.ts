import {ChartData, ChartDataset} from "chart.js";
import {StatisticChart} from "fusio-sdk/dist/src/generated/backend/StatisticChart";
import {StatisticChartData} from "fusio-sdk/dist/src/generated/backend/StatisticChartData";

export class Converter {

  private static BACKGROUND_COLOR = ['rgba(148,159,177,0.2)'];
  private static BORDER_COLOR = ['rgba(148,159,177,1)'];
  private static POINT_BACKGROUND_COLOR = ['rgba(148,159,177,1)'];
  private static POINT_BORDER_COLOR = ['#fff'];
  private static POINT_HOVER_BACKGROUND_COLOR = ['#fff'];
  private static POINT_HOVER_BORDER_COLOR = ['rgba(148,159,177,0.8)'];

  public static convertChart(data: StatisticChart, maxElements?: number): ChartData<'line', StatisticChartData> {
    let labels = data.labels?.map((value) => {
      return value.substring(5);
    });

    if (maxElements) {
      labels = labels?.slice(maxElements * -1);
    }

    return {
      datasets: Converter.convertChartData(data.data, data.series, maxElements),
      labels: labels || [],
    };
  }

  public static convertChartData(data?: Array<StatisticChartData>, series?: Array<string>, maxElements?: number): Array<ChartDataset<'line', StatisticChartData>> {
    if (!data || !series) {
      return [];
    }

    let dataSets: Array<ChartDataset<'line', StatisticChartData>> = [];

    for (let i = 0; i < series.length; i++) {
      let values: Array<number> = [];
      if (Array.isArray(data[i])) {
        if (maxElements) {
          values = (data[i] as Array<number>).slice(maxElements * -1);
        } else {
          values = data[i] as Array<number>;
        }
      }

      dataSets.push({
        label: series[i],
        data: values,
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
