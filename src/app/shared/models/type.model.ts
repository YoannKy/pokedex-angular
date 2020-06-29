import { Base } from './base.model';

export class Type extends Base {
  damage_relations: {
    no_damage_to: Type[],
    no_damage_from: Type[],
    half_damage_to: Type[],
    half_damage_from: Type[],
    double_damage_to: Type[],
    double_damage_from: Type[],
  };

  constructor(type: Partial<Type>) {
    super({
      id: type.id,
      name: type.name,
      url: type.url,
    });
    this.damage_relations = type.damage_relations;
  }
}
