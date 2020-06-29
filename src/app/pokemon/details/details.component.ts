import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

import { Observable } from 'rxjs';
import { flatMap, pluck, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Pokemon } from '@shared/models/pokemon.model';
import { colorByType } from '@shared/const/type.const';

import { PokemonService } from '@core/api/pokemon.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [
   trigger('fadeInOut', [
     state('in', style({opacity: 1})),
     transition(':enter', [
       style({opacity: 0}),
       animate(800),
     ]),
     transition(':leave',
       animate(0, style({opacity: 0}))),
   ]),
 ],
})
export class DetailsComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon>;
  loading = true;
  color = colorByType;
  height: number;
  isMobile: boolean;
  destroy$ = new Subject<boolean>();

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private mediaObserver: MediaObserver,
  ) { }

  ngOnInit(): void {
    this.pokemon$ = this.route.params.pipe(
      pluck('pokemonId'),
      flatMap(this.pokemonService.getById.bind(this.pokemonService)),
    );

    this.mediaObserver
      .asObservable()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((change: MediaChange[]) => {
        if (change[0].mqAlias === 'sm' || change[0].mqAlias === 'xs') {
          if (change[0].mqAlias === 'xs') {
            this.isMobile = true;
            this.height = 220;
          } else {
            this.isMobile = false;
            this.height = 250;
          }
        } else if (change[0].mqAlias === 'md') {
          this.height = 400;
          this.isMobile = false;
        } else {
          this.height = 400;
          this.isMobile = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
