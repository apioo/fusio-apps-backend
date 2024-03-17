import {ApexAxisChartSeries, ApexXAxis} from "ngx-apexcharts";
import {BackendStatisticChart, BackendStatisticChartData} from "fusio-sdk";

export class Converter {

  public static convertChart(data: BackendStatisticChart, maxElements?: number): ChartOptions {
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

  public static convertChartData(data?: Array<BackendStatisticChartData>, series?: Array<string>, maxElements?: number): ApexAxisChartSeries {
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
