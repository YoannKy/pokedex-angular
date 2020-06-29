import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pokemon } from '@shared/models/pokemon.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @Input() pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  goToPrevious(id: string): void {
    this.router.navigate(['../', +id - 1], { relativeTo: this.route });
  }

  goToNext(id: string): void {
    this.router.navigate(['../', +id + 1], { relativeTo: this.route });
  }

  goToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canGoToPrevious(id: string): boolean {
    return +id - 1 > 0;
  }

  canGoToNext(id: string): boolean {
    return +id + 1 <= 807;
  }

}
