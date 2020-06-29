import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  map } from 'rxjs/operators';

import { EvolutionChain } from '@shared/models/evolution-chain.model';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EvolutionChainService extends ApiService<EvolutionChain> {
  constructor(
    protected httpClient: HttpClient) {
    super(httpClient, 'evolution-chain');
  }

  getByUrl(id: string) {
    return super.getByUrl(id).pipe(
      map((evolutionChain) => this.format(evolutionChain.chain)),
    );
  }

  private format(evolutionChain: EvolutionChain): EvolutionChain {
    if (!!evolutionChain.evolves_to.length) {
      return new EvolutionChain({
        ...evolutionChain,
        evolves_to: evolutionChain.evolves_to.map(
        evolution => this.format(evolution)),
      });
    }
    return new EvolutionChain(evolutionChain);
  }
}
