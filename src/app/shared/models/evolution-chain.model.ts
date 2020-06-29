import { Base } from './base.model';

import { regexUrl } from '../../shared/const/url.const';

export class EvolutionChain extends Base {
  species: {
    id: string;
    name: string;
    url: string;
  };
  evolves_to: EvolutionChain[];
  chain?: EvolutionChain;
  image: string;

  constructor(evolutionChain: Partial<EvolutionChain>) {
    let id = evolutionChain.id;
    if (regexUrl.test(evolutionChain.species.url)) {
      id = regexUrl.exec(evolutionChain.species.url)[1];
    }
    super({
      id,
      name: evolutionChain.name,
      url: evolutionChain.url,
    });

    this.image = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

    this.evolves_to = evolutionChain.evolves_to;
    this.species = evolutionChain.species;
  }
}
