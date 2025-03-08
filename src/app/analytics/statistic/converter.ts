import {ApexAxisChartSeries, ApexXAxis} from "ngx-apexcharts";
import {BackendStatisticChart, BackendStatisticChartSeries} from "fusio-sdk";

export class Converter {

  public static convertChart(data: BackendStatisticChart, maxElements?: number): ChartOptions {
    let labels = data.labels?.map((value) => {
      return value.substring(5);
    });

    if (maxElements) {
      labels = labels?.slice(maxElements * -1);
    }

    return {
      series: Converter.convertChartData(data.series, maxElements),
      xaxis: {
        categories: labels || []
      },
    };
  }

  public static convertChartData(series?: Array<BackendStatisticChartSeries>, maxElements?: number): ApexAxisChartSeries {
    if (!series) {
      return [];
    }

    let dataSets: Array<{ name: string, data: Array<number> }> = [];

    for (let i = 0; i < series.length; i++) {
      let values: Array<number> = [];
      if (Array.isArray(series[i].data)) {
        if (maxElements) {
          values = series[i].data?.slice(maxElements * -1) || [];
        } else {
          values = series[i].data || [];
        }
      }

      dataSets.push({
        name: series[i].name || '',
        data: values,
      })
    }

    return dataSets;
  }

  public static convertPieChart(data: BackendStatisticChart): PieChartOptions {
    let series: Array<number> = [];
    if (data.series && Array.isArray(data.series[0].data)) {
      series = data.series[0].data;
    }

    return {
      series: series,
      labels: data.labels || [],
    };
  }
}

export type ChartOptions = {
  series: ApexAxisChartSeries
  xaxis: ApexXAxis
};

export type PieChartOptions = {
  series: Array<number>
  labels: Array<string>
};
