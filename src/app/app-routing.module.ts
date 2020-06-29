import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'pokemons',
  loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule),
}, {
  path: '',
  redirectTo: '/pokemons',
  pathMatch: 'full',
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
