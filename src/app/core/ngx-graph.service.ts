import { Injectable } from '@angular/core';

import { Edge, Node } from '@swimlane/ngx-graph';

import { EvolutionChain } from '@shared/models/evolution-chain.model';

export interface NgxData {
  nodes: Node[];
  links: Edge[];
}

@Injectable({
  providedIn: 'root',
})
export class NgxGraphService {
  setDataFromEvolutionChain(evolutionChain: EvolutionChain): NgxData {
    const data: NgxData = {
        nodes: [{
          id: evolutionChain.id,
          label: evolutionChain.species.name,
          meta: {
            link: evolutionChain.image,
          },
        }],
        links: [],
      };

    return evolutionChain.evolves_to.reduce((acc, evolution) => {
      if (!!evolution.evolves_to.length) {
        const nestedEvolution = this.setDataFromEvolutionChain(evolution);
        return {
          ...acc,
          nodes: [...acc.nodes, ...nestedEvolution.nodes],
          links: [
            ...acc.links,
            { source: evolutionChain.id, target: evolution.id },
            ...nestedEvolution.links,
          ],
        };
      }

      return {
        ...acc,
        nodes: [
          ...acc.nodes,
          {
            id: evolution.id,
            label: evolution.species.name,
            meta: {
              link: evolution.image,
            },
          },
        ],
        links: [
          ...acc.links,
          {
            source: evolutionChain.id,
            target: evolution.id,
          },
        ],
      };
    }, data);

  }
}
