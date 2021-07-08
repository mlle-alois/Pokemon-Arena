import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SelectPokemonComponent} from "./components/select-pokemon/select-pokemon.component";
import {ArenaComponent} from "./components/arena/arena.component";

const routes: Routes = [
  { path: '', component: SelectPokemonComponent },
  { path: 'arena', component: ArenaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
