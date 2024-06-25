
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ChampionsListComponent } from 'src/app/pages/champions-list/champions-list.component';
import { SummonerSpellsComponent } from 'src/app/pages/summoner-spells/summoner-spells.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'champions-list',
    canActivate: [AuthGuard],
    component: ChampionsListComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/champions-list/champions-list.module').then(
            (m) => m.ChampionsListModule
          ),
      },
    ],
  },
  {
    path: 'summoner-list',
    canActivate: [AuthGuard],
    component: SummonerSpellsComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../../../pages/summoner-spells/summoner-spells.module').then(
            (m) => m.SummonerSpellsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutBaseRoutingModule { }
