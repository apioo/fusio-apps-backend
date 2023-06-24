import {ChartData, ChartDataset} from "chart.js";
import {StatisticChart} from "fusio-sdk/dist/src/generated/backend/StatisticChart";
import {StatisticChartData} from "fusio-sdk/dist/src/generated/backend/StatisticChartData";
import {ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis} from "ngx-apexcharts";

export class Converter {

  public static convertChart(data: StatisticChart, maxElements?: number): ChartOptions {
    let labels = data.labels?.map((value) => {
      return value.substring(5);
    });

    if (maxElements) {
      labels = labels?.slice(maxElements * -1);
    }

    return {
      series: Converter.convertChartData(data.data, data.series, maxElements),
      xaxis: {
        categories: labels || []
      },
    };
  }

  public static convertChartData(data?: Array<StatisticChartData>, series?: Array<string>, maxElements?: number): ApexAxisChartSeries {
    if (!data || !series) {
      return [];
    }

    let dataSets: Array<{ name: string, data: Array<number> }> = [];

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
        name: series[i],
        data: values,
      })
    }

    return dataSets;
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries
  xaxis: ApexXAxis
};
