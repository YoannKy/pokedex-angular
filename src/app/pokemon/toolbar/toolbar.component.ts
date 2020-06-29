import { Component, OnInit, Output , EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { flatMap, map, startWith, tap } from 'rxjs/operators';

import { PokemonService } from '@core/api/pokemon.service';

import { Pokemon } from '@shared/models/pokemon.model';
import { regexUrl } from '@shared/const/url.const';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  formControl = new FormControl();
  filteredOptions: Observable<{value: string, label: string}[]>;
  highLightOption: string;
  @Output() idPokemonSelected = new EventEmitter<string>();

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      tap(value => this.highLightOption = value),
      flatMap((value: string) =>
        this.pokemonService.list({ limit: 807, offset: 0, getDetails: false}).pipe(
          map(list =>
            list.results.reduce((acc, pokemon: Pokemon) => {
              if (!pokemon.name.toLowerCase().includes(value.toLowerCase())) {
                return acc;
              }

              const [, id] = regexUrl.exec(pokemon.url);

              return [...acc, { value: id, label: pokemon.name }];
            }, []),
          ),
        ),
      ));
    }

    goToDetails(id: string): void {
      this.router.navigate(['./', id], { relativeTo: this.route });
    }
}
