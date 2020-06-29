import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, iif, of } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { Pokemon } from '@shared/models/pokemon.model';
import { Type } from '@shared/models/type.model';
import { Species } from '@shared/models/species.model';

import { ApiService } from './api.service';
import { TypeService } from './type.service';
import { SpeciesService } from './species.service';

type RawType =  Type & { type: {url: string} };

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends ApiService<Pokemon> {
  constructor(
    protected httpClient: HttpClient,
    private typeService: TypeService,
    private speciesService: SpeciesService) {
    super(httpClient, 'pokemon');
  }

  list({ limit, offset, getDetails = true }: { limit: number, offset: number, getDetails?: boolean } = {
    limit: 100,
    offset: 200,
    getDetails: true,
  }) {
    return super.list({ limit, offset }).pipe(
      flatMap(
        list =>
          iif(
            () => getDetails,
            forkJoin(
              list.results.map(pokemon => this.getByUrl(pokemon.url)),
            ).pipe(
              map(pokemons => ({
                ...list,
                results: pokemons.map((
                  pokemon => new Pokemon(
                    {
                      ...pokemon,
                      types: (pokemon.types as RawType[]).map(({ type }) => this.typeService.getByUrl(type.url)),
                      species: this.speciesService.getByUrl((pokemon.species as Species).url),
                    },
                  )
                )),
              })),
            ),
            of(list),
          ),
        ),
    );
  }

  listByUrl(url: string) {
    return super.listByUrl(url).pipe(
      flatMap(
        list => forkJoin(
          list.results.map(pokemon => this.getByUrl(pokemon.url)),
        ).pipe(
          map(pokemons => ({
            ...list,
            results: pokemons.map((
              pokemon => new Pokemon(
                {
                  ...pokemon,
                  types: (pokemon.types as RawType[]).map(({ type }) => this.typeService.getByUrl(type.url)),
                  species: this.speciesService.getByUrl((pokemon.species as Species).url),
                },
              )
            )),
          }),
        ),
      ),
    ));
  }

  getById(id: string) {
    return super.getById(id).pipe(
      map(pokemon => new Pokemon(
        {
          ...pokemon,
          types: (pokemon.types as RawType[]).map(({ type }) => this.typeService.getByUrl(type.url)),
          species: this.speciesService.getByUrl((pokemon.species as Species).url)
        }
      ))
    );
  }
}
