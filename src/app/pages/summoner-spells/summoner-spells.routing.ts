import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummonerSpellsComponent } from './summoner-spells.component';

const routes: Routes = [
  { path: '', component: SummonerSpellsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummonerSpellsRoutes { }


