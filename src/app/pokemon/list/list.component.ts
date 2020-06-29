import { Component, AfterViewInit, OnDestroy, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { Subject } from 'rxjs';
import { filter, tap, flatMap, takeUntil } from 'rxjs/operators';

import { PokemonService } from '@core/api/pokemon.service';
import { ListResponse } from '@core/api/api.service';

import { Pokemon } from '@shared/models/pokemon.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) virtualScroll: CdkVirtualScrollViewport;

  destroy$ = new Subject<boolean>();
  data: ListResponse<Pokemon>;
  itemSize: number;
  fetching = false;
  pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    private cdf: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.pokemonService.list({ limit: 100, offset: 0 })
      .pipe(
        tap((data: ListResponse<Pokemon>) => {
          this.data = data;
          this.pokemons = data.results;
        }),
        takeUntil(this.destroy$),
      ).subscribe();
    }

  ngAfterViewInit(): void {
    this.virtualScroll.renderedRangeStream
    .pipe(
      filter(() => !this.fetching && this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength() && !!this.data.next),
      tap(() => this.fetching = true),
      flatMap(() => this.pokemonService.listByUrl(this.data.next)),
      tap((data: ListResponse<Pokemon>) => {
        this.data = data;
        this.pokemons = [...this.pokemons, ...data.results];
        this.fetching = false;
        this.cdf.detectChanges();
      }),
      takeUntil(this.destroy$),
    )
    .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
