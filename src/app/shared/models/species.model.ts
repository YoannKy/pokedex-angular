import { Base } from './base.model';
import { EvolutionChain } from './evolution-chain.model';


export class Species extends Base {
  evolution_chain: EvolutionChain;
  flavor_text_entries: {
    flavor_text: string
  }[];

  constructor(species: Partial<Species>) {
      super({
        id: species.id,
        name: species.name,
        url: species.url,
      });

      this.evolution_chain = species.evolution_chain;
      this.flavor_text_entries = species.flavor_text_entries;
  }
}
