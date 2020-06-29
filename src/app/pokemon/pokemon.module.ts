import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared/shared.module';

import { CardComponent } from './card/card.component';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EvolutionsComponent } from './evolutions/evolutions.component';
import { StatsComponent } from './stats/stats.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    ListComponent,
    DetailsComponent,
    CardComponent,
    ToolbarComponent,
    EvolutionsComponent,
    StatsComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PokemonModule { }
