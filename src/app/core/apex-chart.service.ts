import { Injectable } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexOptions,
} from 'ng-apexcharts';

import { Stat } from '@shared/models/pokemon.model';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  options: ApexOptions;
  title: ApexTitleSubtitle;
}

@Injectable({
  providedIn: 'root',
})
export class ApexChartService {
  generateStatsGraph(stats: Stat[], title: string): Partial<ChartOptions> {
    const data: Partial<ChartOptions> = {
      series: [
        {
          name: 'stats',
          data: [],
        },
      ],
      title: {
        text: title,
        style: {
          color: 'white',
        },
      },
      xaxis: {
        categories: [],
      },
      chart: {
        height: 350,
        type: 'radar',
        foreColor: 'black',
      },
      options: {
        colors: ['#F44336'],
      },
    };

    return stats.reduce(
       (acc, stat) => ({
         ...acc,
        xaxis: {...acc.xaxis,
          categories: [...acc.xaxis.categories, stat.stat.name],
        },
        series: acc.series.map(
          (serie => ({
            ...serie,
            data: [
              ...(serie.data) as number[],
              stat.base_stat,
            ],
          }))),
      }), data,
    );
  }
}
