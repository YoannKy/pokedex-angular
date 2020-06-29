import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { flatMap, map } from 'rxjs/operators';

import { Species } from '@shared/models/species.model';

import { EvolutionChainService } from './evolution-chain.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService extends ApiService<Species> {
  constructor(
    protected httpClient: HttpClient,
    private evolutionChainService: EvolutionChainService) {
    super(httpClient, 'pokemon-species');
  }

  getByUrl(id: string) {
    return super.getByUrl(id).pipe(
      flatMap(
        species => this.evolutionChainService
        .getByUrl(species.evolution_chain.url)
        .pipe(
          map(evolutionChain => new Species({...species, evolution_chain: evolutionChain})),
        ),
      ),
    );
  }
}
