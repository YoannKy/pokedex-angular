import { Injectable } from '@angular/core';

import { Type } from '@shared/models/type.model';

const defenseMultiplier = {
  half_damage_from: 0.5,
  double_damage_from: 2,
  no_damage_from: 0,
};

const attackMultiplier = {
  half_damage_to: 0.5,
  double_damage_to: 2,
  no_damage_to: 0,
};

export interface Multiplier {
  attack: { [type: string]: number };
  defense: { [type: string]: number };
}

@Injectable({
  providedIn: 'root',
})
export class DamageTypeService {
  setMultipliers(types: Type[]): Multiplier {
    return types.reduce(
      (acc: Multiplier, type: Type) => {
        const damageRelations = Object.entries(type.damage_relations);
        const { attack, defense } = this.formatEachDamageRelation(damageRelations, acc);
        return  {
            ...acc,
            attack: { ...acc.attack, ...attack },
            defense: { ...acc.defense, ...defense },
          };
      }, { attack: {}, defense: {} });
    }

  private formatEachDamageRelation(damageRelations: [string, Type[]][], acc: Multiplier) {
    return damageRelations.reduce(
      (damageRelationAcc: Multiplier, [damageRelation, vsTypes]) => {
        const { attack, defense }: Multiplier = this.formatAllTypesForADamageRelation(vsTypes, damageRelation, acc);
        return {
          ...damageRelationAcc,
          attack: { ...damageRelationAcc.attack, ...attack },
          defense: { ...damageRelationAcc.defense, ...defense },
        };
      }, { attack: {}, defense: {} });
    }

  private formatAllTypesForADamageRelation(
    types: Type[],
    damageRelation: string,
    existingDamageAcc: Multiplier,
  ): Multiplier {
    return types.reduce(
    (typeAcc, type) => {
        if (defenseMultiplier[damageRelation] !== undefined) {
          if (
            existingDamageAcc.defense[type.name] !== undefined &&
            existingDamageAcc.defense[type.name] !== defenseMultiplier[damageRelation]
          ) {
            return typeAcc;
          } else if (existingDamageAcc.defense[type.name] === defenseMultiplier[damageRelation]) {
            return {
              ...typeAcc,
              defense: {
                ...typeAcc.defense,
                [type.name]: defenseMultiplier[damageRelation] * defenseMultiplier[damageRelation],
              },
            };
          }
          return {
            ...typeAcc,
            defense: {
              ...typeAcc.defense,
              [type.name]: defenseMultiplier[damageRelation],
            },
          };
        } else if (attackMultiplier[damageRelation] !== undefined) {
          if (
            existingDamageAcc.attack[type.name] !== undefined &&
            existingDamageAcc.attack[type.name] !== attackMultiplier[damageRelation]
          ) {
            return typeAcc;
          } else if ( existingDamageAcc.attack[type.name] === attackMultiplier[damageRelation]) {
            return {
              ...typeAcc,
              attack: {
                ...typeAcc.attack,
                [type.name]: attackMultiplier[damageRelation] * attackMultiplier[damageRelation],
              },
            };
          }
          return {
            ...typeAcc,
            attack: {
              ...typeAcc.attack,
              [type.name]: attackMultiplier[damageRelation],
            },
          };
        } else {
          return typeAcc;
        }
      }, { attack: {}, defense: {} });
  }
}
