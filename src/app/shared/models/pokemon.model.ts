import { Observable, forkJoin, isObservable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Base } from './base.model';
import { Type } from './type.model';
import { Species } from './species.model';

export interface Sprites {
    back_female?: string;
    back_shiny_female?: string;
    back_default: string;
    front_female?: string;
    front_shiny_female?: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export class Pokemon extends Base {
  sprites: Sprites;
  types: Type[] | Observable<Type>[];
  image: string;
  stats: Stat[];
  species: Species | Observable<Species>;
  height: number;
  weight: number;

  constructor(pokemon: Partial<Pokemon>) {
      super({
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.url,
      });

      this.sprites = pokemon.sprites;
      this.types = pokemon.types;
      this.image = `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`;
      this.stats = pokemon.stats;
      this.species = pokemon.species;
      this.height = pokemon.height;
      this.weight = pokemon.weight;
  }

  getFormattedId(): string {
    if (+this.id < 10) {
      return `00${this.id}`;
    } else if (+this.id < 100) {
      return `0${this.id}`;
    } else {
      return this.id;
    }
  }

  getFormattedHeight(): string {
    return (this.height * 0.1).toFixed(1);
  }

  getFormattedWeight(): string {
    return (this.weight * 0.1).toFixed(1);
  }

  // private format(types: Type[]) {
  //   return types.m&ap(
  //     (type => type.formatDamage()),
  //   ).reduce((acc, { attack, defense }) => {
  //     return {
  //       ...acc,
  //       attack: Object.entries(attack).reduce(
  //         (accAttack, [type, value]) => {
  //           if (acc.attack[type]) {
  //             return accAttack;
  //           }
  //
  //           return [...accAttack, {[type]: value}];
  //         },
  //         [],
  //       ),
  //       defense: Object.entries(defense).reduce(
  //         (accDefense, [type, value]) => {
  //           if (acc.defense[type]) {
  //             return accDefense;
  //           }
  //
  //           return [...accDefense, {[type]: value}];
  //         },
  //         [],
  //       ),
  //     };
  //   }, { attack: [], defense: []});
  // }
}
