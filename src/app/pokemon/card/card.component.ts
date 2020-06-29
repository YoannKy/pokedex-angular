import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '@shared/models/pokemon.model';
import { colorByType } from '@shared/const/type.const';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() pokemon: Pokemon;

  color = colorByType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  goToDetails(id: string): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

}
