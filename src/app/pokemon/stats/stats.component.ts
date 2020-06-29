import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ApexChartService, ChartOptions } from '@core/apex-chart.service';
import { DamageTypeService, Multiplier } from '@core/damage-type.service';

import { colorByType } from '@shared/const/type.const';
import { Pokemon } from '@shared/models/pokemon.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnChanges {
  @Input() pokemon: Pokemon;

  mutltipliers$: Observable<Multiplier>;
  color = colorByType;
  chartOptions: Partial<ChartOptions>;
  switchTitle = 'attack';

  constructor(
    private apexChartServicce: ApexChartService,
    private damageTypeService: DamageTypeService,
  ) {}

  ngOnInit(): void {
    this.chartOptions = this.apexChartServicce.generateStatsGraph(
      this.pokemon.stats,
      'pokemon\'s stats',
    );

    this.mutltipliers$ = forkJoin(this.pokemon.types).pipe(
      map(types => this.damageTypeService.setMultipliers(types)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.pokemon?.currentValue) {
      this.chartOptions = this.apexChartServicce.generateStatsGraph(
        this.pokemon.stats,
        'pokemon\'s stats',
      );

      this.mutltipliers$ = forkJoin(this.pokemon.types).pipe(
        map(types => this.damageTypeService.setMultipliers(types)),
      );
    }
  }

  switchMultipliers($event: MatSlideToggleChange): void {
    if (!!$event.checked) {
      this.switchTitle = 'defense';
    } else {
      this.switchTitle = 'attack';
    }
  }

}
